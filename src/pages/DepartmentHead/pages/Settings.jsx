import React, { useState, useEffect } from "react";
import { RiEyeLine, RiEyeOffLine, RiCameraLine } from "react-icons/ri";
import userImage from "../../../../src/images/user.png";

const Settings = () => {
  const [formData, setFormData] = useState({
    employeeNumber: "2020-102840",
    email: "petrovak@departmenthead.national-u.edu",
    firstName: "Katherina",
    lastName: "Petrova",
    middleName: "",
    currentPassword: "Petrova@20",
    newPassword: "PetrovaK@20",
    confirmPassword: "PetrovaK@20",
  });

  const [showPasswords, setShowPasswords] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords({
      ...showPasswords,
      [field]: !showPasswords[field],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Profile: ", formData);
  };

  return (
    <div className="mt-[8rem] ml-0 md:ml-[260px] flex flex-col px-4 md:px-10 pb-4">
      <div>
        {/* Avatar Section */}
        <div className="flex flex-col justify-center items-center gap-10">
          <div className="relative">
            <img
              src={userImage}
              alt="Avatar"
              className="w-[6rem] md:w-[7rem] h-auto border-[4px] rounded-full border-[#35408E]"
            />
            <button
              className="left-[24px] md:left-[32px]"
              style={{
                position: "absolute",
                bottom: "-15px",
                right: "0",
                backgroundColor: "#35408E",
                color: "white",
                borderRadius: "50%",
                width: "36px",
                height: "36px",
                border: "none",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <RiCameraLine size={20} />
            </button>
          </div>
          {/* Edit Profile Section */}
          <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-4">
            <div
              className="flex flex-col gap-4 w-full"
              style={{
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
              }}
            >
              <div
                className="text-base md:text-lg"
                style={{
                  backgroundColor: "#35408E",
                  color: "white",
                  padding: "10px 20px",
                  textAlign: "center",
                }}
              >
                Edit Profile
              </div>
              <div
                style={{
                  padding: "20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "15px",
                }}
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "5px",
                    }}
                    className="text-sm md:text-base"
                  >
                    Employee Number*
                  </label>
                  <input
                    type="text"
                    name="employeeNumber"
                    value={formData.employeeNumber}
                    style={{
                      width: "100%",
                      padding: "10px",
                      fontSize: "16px",
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "5px",
                    }}
                    className="text-sm md:text-base"
                  >
                    Email*
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    style={{
                      width: "100%",
                      padding: "10px",
                      fontSize: "16px",
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "5px",
                    }}
                    className="text-sm md:text-base"
                  >
                    First Name*
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    style={{
                      width: "100%",
                      padding: "10px",
                      fontSize: "16px",
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "5px",
                    }}
                    className="text-sm md:text-base"
                  >
                    Last Name*
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    style={{
                      width: "100%",
                      padding: "10px",
                      fontSize: "16px",
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "5px",
                    }}
                    className="text-sm md:text-base"
                  >
                    Middle Name
                  </label>
                  <input
                    type="text"
                    name="middleName"
                    value={formData.middleName}
                    onChange={handleChange}
                    style={{
                      width: "100%",
                      padding: "10px",
                      fontSize: "16px",
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                    }}
                  />
                </div>
              </div>
            </div>
            {/* Password Section */}
            <div
              style={{
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
              }}
            >
              <div
                className="text-base md:text-lg"
                style={{
                  backgroundColor: "#35408E",
                  color: "white",
                  padding: "10px 20px",
                  textAlign: "center",
                }}
              >
                Password
              </div>
              <div
                style={{
                  padding: "20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "15px",
                }}
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "5px",
                    }}
                    className="text-sm md:text-base"
                  >
                    Current Password*
                  </label>
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                    }}
                  >
                    <input
                      type={showPasswords.currentPassword ? "text" : "password"}
                      name="currentPassword"
                      value={formData.currentPassword}
                      onChange={handleChange}
                      style={{
                        width: "100%",
                        padding: "10px",
                        paddingRight: "40px",
                        fontSize: "16px",
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                        boxSizing: "border-box",
                        cursor: "text",
                      }}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        togglePasswordVisibility("currentPassword")
                      }
                      style={{
                        position: "absolute",
                        right: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "#666",
                        padding: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "30px",
                        height: "30px",
                        zIndex: 10,
                      }}
                    >
                      {showPasswords.currentPassword ? (
                        <RiEyeOffLine size={20} />
                      ) : (
                        <RiEyeLine size={20} />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "5px",
                    }}
                    className="text-sm md:text-base"
                  >
                    New Password*
                  </label>
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                    }}
                  >
                    <input
                      type={showPasswords.newPassword ? "text" : "password"}
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleChange}
                      style={{
                        width: "100%",
                        padding: "10px",
                        paddingRight: "40px",
                        fontSize: "16px",
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                        boxSizing: "border-box",
                        cursor: "text",
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility("newPassword")}
                      style={{
                        position: "absolute",
                        right: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "#666",
                        padding: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "30px",
                        height: "30px",
                        zIndex: 10,
                      }}
                    >
                      {showPasswords.newPassword ? (
                        <RiEyeOffLine size={20} />
                      ) : (
                        <RiEyeLine size={20} />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "5px",
                    }}
                    className="text-sm md:text-base"
                  >
                    Confirm New Password*
                  </label>
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                    }}
                  >
                    <input
                      type={showPasswords.confirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      style={{
                        width: "100%",
                        padding: "10px",
                        paddingRight: "40px",
                        fontSize: "16px",
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                        boxSizing: "border-box",
                        cursor: "text",
                      }}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        togglePasswordVisibility("confirmPassword")
                      }
                      style={{
                        position: "absolute",
                        right: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "#666",
                        padding: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "30px",
                        height: "30px",
                        zIndex: 10,
                      }}
                    >
                      {showPasswords.confirmPassword ? (
                        <RiEyeOffLine size={20} />
                      ) : (
                        <RiEyeLine size={20} />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Save Changes Button */}
          <button
            className="text-sm md:text-base"
            onClick={handleSubmit}
            style={{
              backgroundColor: "#35408E",
              color: "white",
              padding: "0.75rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              border: "none",
              cursor: "pointer",
              height: "50px",
              width: "200px",
              justifyContent: "center",
              borderRadius: "5px",
              whiteSpace: "nowrap",
            }}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
