import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import "../pages/Transaction.css";
import IconSelector from "../components/IconSelector";
import { Icon } from "@iconify/react"; // For preview
import { useNavigate } from "react-router-dom";

const AddTransaction = ({ onClose, onSuccess }) => {
  const [transactionName, setTransactionName] = useState("");
  const [selectedIcon, setSelectedIcon] = useState(null);
  const navigate = useNavigate();

  const generateId = (name) => {
    const words = name.split(" ").filter((word) => word.length > 0);
    let initials = "";

    if (words.length >= 3) {
      initials = words[0][0] + words[1][0] + words[2][0];
    } else if (words.length === 2) {
      initials = words[0][0] + words[1][0] + (words[1][1] || "");
    } else if (words.length === 1) {
      initials = words[0].slice(0, 3);
    }

    return initials.toUpperCase();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedIcon) {
      alert("Please select an icon.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const payload = {
        transactionID: generateId(transactionName),
        name: transactionName,
        icon: selectedIcon,
      };

      const response = await fetch(
        "http://localhost:5000/api/auth/add-transaction",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (response.status === 401) {
        // Redirect to login page if unauthorized
        navigate("/login");
        return;
      }

      if (response.ok) {
        alert("Transaction added successfully!");
        handleClearFields();
        onClose();
        onSuccess();
      } else {
        alert(data.message || "Failed to add transaction.");
      }
    } catch (error) {
      console.error("Transaction error:", error);
      alert("Unexpected error occurred.");
    }
  };

  const handleClearFields = () => {
    setTransactionName("");
    setSelectedIcon(null);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">Add New Transaction</h2>
          <button className="close-button" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            required
            placeholder="Transaction Name"
            value={transactionName}
            onChange={(e) => setTransactionName(e.target.value)}
            className="w-full p-2 mb-[10px] text-sm md:text-base rounded-md border-[2px] border-[#35408E]"
          />
          <div className="py-2">
            <label className="block font-semibold mb-2">Choose an Icon:</label>
            {selectedIcon && (
              <div className="mb-2 flex items-center gap-2">
                <Icon icon={`mdi:${selectedIcon}`} width={32} height={32} />
                <span>{selectedIcon}</span>
              </div>
            )}
            <IconSelector onSelect={(icon) => setSelectedIcon(icon)} />
          </div>

          <p className="text-sm md:text-base py-[15px]">
            <strong>Date Created:</strong>{" "}
            {new Date().toISOString().split("T")[0]}
          </p>

          <div className="modal-buttons pt-[10px]">
            <button className="save-button text-sm md:text-base">Submit</button>
            <button
              type="button"
              className="clear-button text-sm md:text-base"
              onClick={handleClearFields}
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTransaction;
