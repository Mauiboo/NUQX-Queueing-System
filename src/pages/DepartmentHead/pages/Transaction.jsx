import React, { useState, useEffect } from "react";
import { FaClipboardList, FaSyncAlt } from "react-icons/fa";
import "./Transaction.css";
import AddTransaction from "../components/AddTransaction";
import TransactionInfo from "../components/TransactionInfo";
import { useNavigate } from "react-router-dom";

const Transaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:5000/api/auth/transactions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 401) {
        // Redirect to login page if unauthorized
        navigate("/login");
        return;
      }

      if (response.ok) {
        const data = await response.json();
        setTransactions(data.transactions);
        setLoading(false);
      } else {
        alert("An error occurred. Please refresh the page.");
      }
    } catch (error) {
      alert("An error occurred. Please refresh the page.");
    }
  };

  const handleResetIDFlags = async () => {
    const confirmReset = window.confirm(
      "Are you sure you want to reset all transaction IDs?"
    );
    if (!confirmReset) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:5000/api/auth/reset-id-flags",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (response.status === 401) {
        // Redirect to login page if unauthorized
        navigate("/login");
        return;
      }

      if (response.ok) {
        alert(
          `Reset successful! ${data.modifiedCount} transaction(s) updated.`
        );
      } else {
        alert(data.message || "Failed to reset IDs.");
      }
    } catch (error) {
      console.error("Reset error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="mt-[8rem] ml-0 md:ml-[260px] flex flex-col px-4 md:px-10 pb-4">
      {loading ? (
        <>
          <button
            className="text-white w-fit flex items-center gap-2 h-auto rounded-md px-3 py-2 mb-6 bg-[#35408E] text-sm md:text-base"
            onClick={() => setIsAdding(true)}
          >
            <FaClipboardList />
            <span>Add Transaction</span>
          </button>
          <div className="flex justify-center items-center h-[50vh]">
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
              <p className="text-[#35408E] font-semibold">Loading...</p>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-row flex-wrap gap-4">
            <button
              className="text-white w-fit flex items-center gap-2 h-auto rounded-md px-3 py-2 mb-6 bg-[#35408E] text-sm md:text-base"
              onClick={() => setIsAdding(true)}
            >
              <FaClipboardList />
              <span>Add Transaction</span>
            </button>
            {transactions.length != 0 && (
              <button
                className="text-white w-fit flex items-center gap-2 h-auto rounded-md px-3 py-2 mb-6 bg-[#35408E] text-sm md:text-base"
                onClick={handleResetIDFlags}
              >
                <FaSyncAlt />
                <span>Reset All Transaction IDs</span>
              </button>
            )}
          </div>
          {transactions.length === 0 ? (
            <div className="text-center uppercase text-xl md:text-2xl text-gray-600 font-semibold py-10">
              No transactions listed yet.
            </div>
          ) : (
            <TransactionInfo
              transactions={transactions}
              setTransactions={setTransactions}
              fetchTransactions={fetchTransactions}
            />
          )}

          {isAdding && (
            <AddTransaction
              onClose={() => setIsAdding(false)}
              onSuccess={() => {
                fetchTransactions();
                setIsAdding(false);
              }}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Transaction;
