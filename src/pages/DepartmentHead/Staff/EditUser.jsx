import React, { useState } from "react";
import user from "../../../images/user.png";
import { MdBorderColor } from "react-icons/md";
import { FaTimes } from "react-icons/fa";
const EditUser = ({ onClose }) => {
  const [selectedImage, setSelectedImage] = useState(user);
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClear = () => {
    setFirstName("");
    setMiddleName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setSelectedImage(user);
  };

  const modalStyle = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxHeight: "90vh",
    overflowY: "auto",
    width: "90%",
    maxWidth: "800px",
    background: "#fff",
    padding: "30px",
    borderRadius: "20px",
    boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.2)",
    zIndex: 1001,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const closeButtonStyle = {
    position: "absolute",
    top: "15px",
    right: "20px",
    fontSize: "22px",
    cursor: "pointer",
  };

  const avatarContainerStyle = {
    position: "relative",
    marginBottom: "20px",
    textAlign: "center",
  };

  const avatarImageStyle = {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "4px solid #3f51b5",
  };

  const uploadIconStyle = {
    position: "absolute",
    bottom: "0",
    right: "35%",
    fontSize: "17px",
    cursor: "pointer",
    backgroundColor: "#fff",
    borderRadius: "100%",
    padding: "2px 5px 0px 5px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
  };

  const formContainerStyle = {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    gap: "20px",
    marginTop: "20px",
  };

  const columnStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  };

  const formGroupStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  };

  const labelStyle = {
    marginBottom: "5px",
    fontWeight: "500",
    fontSize: "15px",
    color: "black",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px 15px",
    borderRadius: "10px",
    border: "2px solid #3f51b5",
    outline: "none",
    color: "black !important",
  };

  const buttonGroupStyle = {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    marginTop: "30px",
  };

  const buttonStyle = {
    padding: "12px 24px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    color: "#fff",
    backgroundColor: "#35408E",
    boxShadow: "0px 4px 8px rgba(63, 81, 181, 0.3)",
    transition: "background 0.3s ease",
  };

  return (
    <>
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
      ></div>
      <div style={modalStyle}>
        <span
          className="text-[#35408E]"
          style={closeButtonStyle}
          onClick={onClose}
        >
          <FaTimes />
        </span>

        <div style={avatarContainerStyle}>
          <img src={selectedImage} alt="Profile" style={avatarImageStyle} />
          <label htmlFor="upload-avatar" style={uploadIconStyle}>
            <i className="ri-camera-fill"></i>
          </label>
          <input
            type="file"
            id="upload-avatar"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageUpload}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[15px]">
          <div style={columnStyle}>
            <div>
              <label style={labelStyle}>First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter first name"
                style={inputStyle}
                className="text-sm md:text-base"
              />
            </div>
            <div>
              <label style={labelStyle}>Middle Name</label>
              <input
                type="text"
                value={middleName}
                onChange={(e) => setMiddleName(e.target.value)}
                placeholder="Enter middle name"
                style={inputStyle}
                className="text-sm md:text-base"
              />
            </div>
            <div>
              <label style={labelStyle}>Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter last name"
                style={inputStyle}
                className="text-sm md:text-base"
              />
            </div>
          </div>

          <div style={columnStyle}>
            <div>
              <label style={labelStyle}>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                style={inputStyle}
                className="text-sm md:text-base"
              />
            </div>
            <div>
              <label style={labelStyle}>Default Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                style={inputStyle}
                className="text-sm md:text-base"
              />
            </div>
            <div>
              <label style={labelStyle}>Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
                style={inputStyle}
                className="text-sm md:text-base"
              />
            </div>
          </div>
        </div>

        <div style={buttonGroupStyle}>
          <button className="text-sm md:text-base" style={buttonStyle}>
            Submit
          </button>
          <button
            className="text-sm md:text-base"
            style={buttonStyle}
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      </div>
    </>
  );
};

export default EditUser;
