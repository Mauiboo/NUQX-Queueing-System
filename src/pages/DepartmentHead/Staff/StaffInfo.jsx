import React, { useState } from "react";
import { Edit, Trash2 } from "lucide-react";
import EditUser from "./EditUser";
import user from "../../../images/user.png";

const StaffInfo = ({ staff }) => {
  const [selectedImage, setSelectedImage] = useState(user);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const styles = {
    staffList: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
      gap: "20px",
      marginTop: "20px",
    },
    staffCard: {
      padding: "20px",
      borderRadius: "12px",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      display: "flex",
      alignItems: "center",
      transition: "transform 0.2s ease-in-out",
      width: "100%",
      position: "relative",
    },
    avatarContainer: {
      position: "relative",
    },
    avatarImage: {
      width: "70px",
      height: "70px",
      borderRadius: "50%",
      objectFit: "cover",
    },
    staffDetails: {
      width: "100%",
    },
    name: {
      fontSize: "1.1em",
      fontWeight: 700,
      color: "#222",
    },
    email: {
      fontSize: "0.9em",
      color: "black",
    },
    buttonGroup: {
      display: "flex",
      gap: "10px",
      position: "relative",
    },
    button: {
      border: "none",
      padding: "8px 14px",
      borderRadius: "20px",
      display: "flex",
      alignItems: "center",
      gap: "5px",
      cursor: "pointer",
      fontSize: "0.85em",
      fontWeight: "normal",
      width: "fit-content",
      height: "40px",
    },
    editButton: {
      backgroundColor: "#35408E",
      color: "white",
    },
    deleteButton: {
      backgroundColor: "#35408E",
      color: "white",
      right: "100px",
    },
  };

  return (
    <div style={styles.staffList}>
      {staff.map((user, index) => (
        <div key={index} style={styles.staffCard}>
          <div className="flex flex-wrap gap-1">
            <div style={styles.avatarContainer}>
              <img
                src={`http://localhost:5000${user.profileImage}`}
                alt="Profile"
                style={styles.avatarImage}
              />
            </div>
            <div className="flex flex-col ml-2">
              <h3 style={styles.name}>{user.name}</h3>
              <p style={styles.email}>{user.email}</p>
              <div style={styles.buttonGroup}>
                <button
                  style={{ ...styles.button, ...styles.editButton }}
                  onClick={() => handleEditClick(user)}
                >
                  <Edit size={16} /> Edit
                </button>
                <button style={{ ...styles.button, ...styles.deleteButton }}>
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
      {isEditModalOpen && selectedUser && (
        <EditUser
          user={selectedUser}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
    </div>
  );
};

export default StaffInfo;
