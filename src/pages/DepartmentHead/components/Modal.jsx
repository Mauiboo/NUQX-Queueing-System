// Modal.jsx
import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const Modal = ({ show, onClose, onConfirm }) => {
  const navigate = useNavigate();

  if (!show) return null;

  const handleConfirm = () => {
    localStorage.removeItem("token");

    if (onConfirm) {
      onConfirm();
    }
  };

  return (
    <div
      className="modal-overlay"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 1000,
      }}
    >
      <div
        className="modal-content"
        style={{
          backgroundColor: "white",
          borderRadius: "8px",
          padding: "20px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          width: "400px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          height: "auto",
          minHeight: "150px",
        }}
      >
        <p
          className="modal-message text-base"
          style={{ textAlign: "center", margin: "0 0 20px 0" }}
        >
          Are you sure you want to log out?
        </p>
        <div
          className="modal-actions"
          style={{ display: "flex", justifyContent: "flex-end", width: "60%" }}
        >
          <button
            className="modal-cancel text-sm md:text-base"
            onClick={onClose}
            style={{
              color: "#35408E",
              backgroundColor: "transparent",
              border: "1px solid #35408E",
              marginRight: "20px",
              cursor: "pointer",
              padding: "5px 0px",
              borderRadius: "8px",
              transition: "all 0.3s",
            }}
          >
            No
          </button>
          <button
            className="modal-submit text-sm md:text-base"
            onClick={handleConfirm}
            style={{
              color: "#35408E",
              backgroundColor: "transparent",
              border: "1px solid #35408E",
              cursor: "pointer",
              padding: "5px 0px",
              borderRadius: "8px",
              transition: "all 0.3s",
            }}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func,
};

export default Modal;
