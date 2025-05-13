const express = require("express");
const router = express.Router();
const { getDb } = require("../connect.cjs");
const { ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authenticateToken = require("../../src/middleware/middlewareAuth");
const JWT_SECRET = process.env.JWT_SECRET;
const path = require("path");
const fs = require("fs");
const multer = require("multer");

// Function to create upload directory if it doesn't exist
const createUploadDir = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

// Users upload setup
const usersUploadDir = path.join(__dirname, "..", "uploads", "users");
createUploadDir(usersUploadDir);

const usersStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, usersUploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});
const uploadUsers = multer({ storage: usersStorage });

// Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const db = getDb();

  try {
    const user = await db.collection("users").findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const payload = {
      userId: user._id,
      firstName: user.firstName,
      middleName: user.middleName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      profileImage: user.profileImage,
    };

    if (
      user.role === "staff" ||
      user.role === "departmentHead" ||
      user.role === "display"
    ) {
      payload.department = user.department;
    }

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "2h" });
    console.log("Token length:", token.length);

    res.status(200).json({
      message: "Login successful",
      token,
      role: user.role,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Register Route
router.post(
  "/register",
  uploadUsers.single("profileImage"),
  async (req, res) => {
    const {
      firstName,
      middleName,
      lastName,
      email,
      password,
      role,
      department,
    } = req.body;

    const profileImagePath = req.file
      ? `/uploads/users/${req.file.filename}`
      : null;
    const db = getDb();

    try {
      // Check if user already exists
      const existingUser = await db.collection("users").findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Prepare the new user object
      const newUser = {
        firstName,
        middleName,
        lastName,
        email,
        password: hashedPassword,
        role,
        profileImage: profileImagePath,
      };

      if (role === "staff" || role === "departmentHead" || role === "display") {
        newUser.department = department;
      }

      // Insert user
      const result = await db.collection("users").insertOne(newUser);

      // Prepare JWT payload
      const payload = {
        userId: result.insertedId,
        firstName,
        middleName,
        lastName,
        email,
        role,
        profileImage: profileImagePath,
      };

      if (role === "staff" || role === "departmentHead" || role === "display") {
        payload.department = department;
      }

      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "2h" });

      res.status(201).json({
        message: "Registered successfully",
        token,
        role,
      });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// Get all staff
router.get("/staff", authenticateToken, async (req, res) => {
  const { department } = req.user;
  const db = getDb();

  try {
    const staff = await db
      .collection("users")
      .find({ role: "staff", department })
      .toArray();
    res.status(200).json({ staff });
  } catch (error) {
    console.error("Error fetching staff:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Add New Transaction
router.post("/add-transaction", authenticateToken, async (req, res) => {
  const { transactionID, name, icon } = req.body;
  const { department } = req.user;
  const db = getDb();

  try {
    const existingTransaction = await db.collection("transactions").findOne({
      name: { $regex: `^${name}$`, $options: "i" },
      department: department,
    });
    if (existingTransaction) {
      return res
        .status(400)
        .json({ message: "Transaction name already exists" });
    }

    const newTransaction = {
      transactionID,
      icon,
      name,
      isHidden: false,
      isIDReset: false,
      department,
      createdAt: new Date(),
    };

    await db.collection("transactions").insertOne(newTransaction);
    res.status(201).json({ message: "Transaction added successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Edit Transaction
router.put("/edit-transaction/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { transactionID, name, icon } = req.body;
  const db = getDb();

  try {
    const existingTransaction = await db.collection("transactions").findOne({
      _id: new ObjectId(id),
    });

    if (!existingTransaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    const noChangesMade =
      (transactionID === undefined ||
        transactionID === existingTransaction.transactionID) &&
      (icon === undefined || icon === existingTransaction.icon) &&
      (name === undefined || name === existingTransaction.name);

    if (noChangesMade) {
      return res
        .status(400)
        .json({ message: "No changes were made to the transaction" });
    }

    // Check for duplicate transaction names
    if (name && name !== existingTransaction.name) {
      const duplicateName = await db.collection("transactions").findOne({
        name: { $regex: `^${name}$`, $options: "i" },
        department: existingTransaction.department,
        _id: { $ne: new ObjectId(id) },
      });

      if (duplicateName) {
        return res
          .status(400)
          .json({ message: "Transaction name already exists" });
      }
    }

    const updatedTransaction = {
      ...(transactionID && { transactionID }),
      ...(icon && { icon }),
      ...(name && { name }),
    };

    await db
      .collection("transactions")
      .updateOne({ _id: new ObjectId(id) }, { $set: updatedTransaction });
    res.status(200).json({ message: "Transaction updated successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Reset isIDReset to true for all transactions
router.put("/reset-id-flags", authenticateToken, async (req, res) => {
  const { department } = req.user;
  const db = getDb();

  try {
    const result = await db
      .collection("transactions")
      .updateMany({ department }, { $set: { isIDReset: true } });

    res.status(200).json({
      message: "All transactions have isIDReset set to true",
      modifiedCount: result.modifiedCount,
    });
  } catch (error) {
    console.error("Error resetting isIDReset:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all transactions
router.post("/transactions", authenticateToken, async (req, res) => {
  const { role, department } = req.user;
  const { selectedDepartment } = req.body;
  const db = getDb();

  try {
    const query = {
      department:
        role === "staff" || role === "departmentHead"
          ? department
          : selectedDepartment,
    };

    const transactions = await db
      .collection("transactions")
      .find(query)
      .toArray();
    res.status(200).json({ transactions });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Toggling the transaction
router.put("/transactions/:id/toggle", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { isHidden } = req.body;

  try {
    const db = getDb();
    await db
      .collection("transactions")
      .updateOne({ _id: new ObjectId(id) }, { $set: { isHidden } });

    res.status(200).json({ message: "Toggle updated successfully" });
  } catch (error) {
    console.error("Toggle update error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Generate Queue or Ticket number
router.post("/generate-queue-number", authenticateToken, async (req, res) => {
  const { isIDReset, transactionName, transactionID, userType, department } =
    req.body;
  const db = getDb();

  try {
    const latestQueue = await db
      .collection("queue-numbers")
      .find({ transactionName })
      .sort({ createdAt: -1 })
      .limit(1)
      .toArray();

    let newNumber;

    if (isIDReset) {
      newNumber = "001";
      await db
        .collection("transactions")
        .updateOne({ transactionName }, { $set: { isIDReset: false } });
    } else if (latestQueue.length > 0) {
      const lastQueue = latestQueue[0];
      const match = lastQueue.generatedQueuenumber.match(
        /(\d{3})(?=\s*(-PL|-NW)?$)/
      );

      if (match) {
        const lastNum = parseInt(match[1], 10);
        newNumber =
          lastNum === 999 ? "001" : (lastNum + 1).toString().padStart(3, "0");
      } else {
        newNumber = "001";
      }
    } else {
      newNumber = "001";
    }
    const normalizedUserType = userType.trim();

    let suffix = "";
    if (normalizedUserType === "Senior or PWD") {
      suffix = " -PL";
    } else if (normalizedUserType === "New Student") {
      suffix = " -NW";
    }

    const isPriority =
      userType === "Senior or PWD" || userType === "New Student";
    const generatedQueuenumber = transactionID + newNumber + suffix;
    const dateCreated = new Date();
    const newQueue = {
      transactionName,
      transactionID,
      generatedQueuenumber,
      isPriority,
      status: "Waiting",
      windowNumber: "",
      createdAt: dateCreated,
      department,
    };

    await db.collection("queue-numbers").insertOne(newQueue);

    res.status(201).json({
      message: "Queue number generated successfully",
      generatedQueuenumber,
      dateCreated,
    });
  } catch (error) {
    console.error("Error generating queue number:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all queue numbers
router.get("/queue-numbers", authenticateToken, async (req, res) => {
  const { department } = req.user;
  const db = getDb();
  try {
    const queueNumbers = await db
      .collection("queue-numbers")
      .find({ department })
      .toArray();
    res.status(200).json({ queueNumbers });
  } catch (error) {
    console.error("Error fetching queuenumbers:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all queue numbers with transactions filtered
router.post(
  "/queue-numbers-with-transactions",
  authenticateToken,
  async (req, res) => {
    const { department } = req.user;
    const { transactionName } = req.body;
    const db = getDb();
    try {
      const queueNumbers = await db
        .collection("queue-numbers")
        .find({ department, transactionName })
        .toArray();
      res.status(200).json({ queueNumbers });
    } catch (error) {
      console.error("Error fetching queuenumbers:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// Updating a queue
router.put("/queue-numbers/:id/update", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { status, windowNumber } = req.body;

  try {
    const db = getDb();
    const queueNum = await db
      .collection("queue-numbers")
      .findOne({ _id: new ObjectId(id) });

    if (!queueNum) {
      return res.status(404).json({ message: "Ticket number not found" });
    }

    if (queueNum.status === "Completed") {
      return res
        .status(400)
        .json({ message: "Ticket number already completed" });
    }

    if (queueNum.status === "Processing" && status === "Processing") {
      return res.status(400).json({
        message:
          "This ticket is already being processed. Please select a different ticket.",
      });
    }

    const updateFields = {
      status,
      ...(status !== "Completed" && { updatedAt: new Date() }),
      ...(status === "Completed" && { dateEnded: new Date() }),
      ...(windowNumber !== undefined && { windowNumber }),
    };

    await db
      .collection("queue-numbers")
      .updateOne({ _id: new ObjectId(id) }, { $set: updateFields });

    res.status(200).json({ message: "Queue number updated successfully" });
  } catch (error) {
    console.error("Queue number update error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get assigned windows
router.get("/windows", authenticateToken, async (req, res) => {
  const { department } = req.user;
  const db = getDb();

  try {
    const assignedWindows = await db
      .collection("windowAssignments")
      .find({ department })
      .toArray();

    res.status(200).json({ windowAssignments: assignedWindows });
  } catch (error) {
    console.error("Error fetching assigned windows:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// // Assign window to user
router.post("/assign-window", authenticateToken, async (req, res) => {
  const { windowNumber, transaction } = req.body;
  const { email, department } = req.user;
  const db = getDb();

  try {
    const existingAssignment = await db
      .collection("windowAssignments")
      .findOne({ windowNumber, department });

    if (existingAssignment) {
      return res.status(400).json({ message: "Window already assigned" });
    }

    await db.collection("windowAssignments").insertOne({
      email,
      windowNumber,
      department,
      transaction,
      assignedAt: new Date(),
    });
    res.status(200).json({
      message: "Window assigned successfully",
    });
  } catch (error) {
    console.error("Error assigning window:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/my-window", authenticateToken, async (req, res) => {
  try {
    const { email } = req.user;
    const db = getDb();

    const user = await db.collection("windowAssignments").findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User Window not found." });
    }

    res.json({
      windowNumber: user.windowNumber || null,
      transaction: user.transaction || null,
    });
  } catch (error) {
    console.error("Error fetching user window:", error);
    res.status(500).json({ message: "Server error." });
  }
});

// Release window assignment
router.delete("/release-window", authenticateToken, async (req, res) => {
  const email = req.user.email;
  const db = getDb();

  try {
    const assignment = await db
      .collection("windowAssignments")
      .findOne({ email });

    if (!assignment) {
      return res
        .status(404)
        .json({ message: "No window assigned to this user" });
    }

    const result = await db
      .collection("windowAssignments")
      .deleteOne({ email });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Failed to release window" });
    }

    res.status(200).json({ message: "Window released successfully" });
  } catch (error) {
    console.error("Error releasing window:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
