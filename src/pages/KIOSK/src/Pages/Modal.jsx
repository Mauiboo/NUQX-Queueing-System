import React from "react";
import Logo from "../../../../images/NULogo.png";
import { useNavigate } from "react-router-dom";

function Modal({
  isOpen,
  onClose,
  isIDReset,
  transactionID,
  transactionName,
  userType,
  department,
  details,
}) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:5000/api/auth/generate-queue-number",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            isIDReset,
            transactionName,
            transactionID,
            userType,
            department,
          }),
        }
      );

      const data = await response.json();

      if (response.status === 401) {
        // Redirect to login page if unauthorized
        navigate("/login");
        return;
      }

      if (response.ok) {
        const generatedNumber = data?.generatedQueuenumber;
        const dateCreated = data?.dateCreated;
        navigate("/kiosk/queue-num", {
          state: {
            ...details,
            queueNumber: generatedNumber,
            dateCreated,
          },
        });
      }
    } catch (error) {
      console.error("Transaction error:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "20px 30px",
          borderRadius: "12px",
          boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
          width: "400px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "15px",
          }}
        >
          <h2
            style={{
              color: "#35408E",
              fontSize: "28px",
              fontWeight: 600,
              margin: 0,
            }}
          >
            Confirm
          </h2>
          <img src={Logo} alt="School Logo" style={{ height: "60px" }} />
        </div>

        <div style={{ marginBottom: "20px", fontSize: "25px", color: "black" }}>
          <p>
            <strong>User Type:</strong> {details.userType}
          </p>
          <p>
            <strong>Concern:</strong> {details.concern}
          </p>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding: "10px 20px",
              backgroundColor: "transparent",
              border: "1px solid #35408E",
              borderRadius: "6px",
              color: "#35408E",
              fontWeight: "bold",
              cursor: "pointer",
              width: "45%",
            }}
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            style={{
              padding: "10px 20px",
              backgroundColor: "#35408E",
              color: "white",
              border: "none",
              borderRadius: "6px",
              fontWeight: "bold",
              cursor: "pointer",
              width: "45%",
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
