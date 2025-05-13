const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const connectToMongo = require("./connect.cjs");
const path = require("path");

dotenv.config({ path: "./config.env" });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: "4mb" }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// MongoDB connection
connectToMongo();

// Routes
app.use("/api/auth", authRoutes);

// Serve static files from the React app's build directory (assuming it's in the root)
const buildPath = path.join(__dirname, '..', 'build');
app.use(express.static(buildPath));

// The "catchall" handler: for any request that doesn't match an API route,
// send back the main index.html file from the React app.
app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
