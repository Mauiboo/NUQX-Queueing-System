import { Button } from "bootstrap";
import React from "react";
import Logo from "../../../../images/NULogo.png";

function ModalGuide() {
  return (
    <div
      style={{
        position: "absolute",
        top: 60,
        left: 0,
        width: "100%",

        display: "flex",
        justifyContent: "center",
        alignItems: "center",
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
            <strong>User Type:</strong> Student or Guest
          </p>
          <p>
            <strong>Concern:</strong> Enrollment
          </p>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <button
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

export default ModalGuide;
