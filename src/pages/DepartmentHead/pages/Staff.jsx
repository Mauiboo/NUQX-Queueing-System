import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, BadgeCheck, Filter, UserPlus } from "lucide-react";
import AddUser from "../Staff/AddUser";
import StaffInfo from "../Staff/StaffInfo";
import userImage from "../../../images/user.png";

const Staff = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/auth/staff", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        // Redirect to login page if unauthorized
        navigate("/login");
        return;
      }

      if (response.ok) {
        const data = await response.json();
        setStaff(data.staff);
        setLoading(false);
      } else {
        alert("An error occurred. Please refresh the page.");
      }
    } catch (error) {
      alert("An error occurred. Please refresh the page.");
    }
  };

  const styles = {
    staffContainer: {
      display: "flex",
      alignItems: "center",
      gap: "15px",
      padding: "10px",
    },
    searchBox: {
      position: "fixed",
      display: "flex",
      alignItems: "center",
      top: "175px",
      left: "1280px",
    },
    searchInput: {
      padding: "8px 12px",
      paddingRight: "30px",
      border: "1px solid #35408E",
      borderRadius: "20px",
      outline: "none",
      width: "200px",
      fontSize: "14px",
    },
    searchIcon: {
      position: "absolute",
      top: "10px",
      right: "10px",
      color: "#35408E",
      cursor: "pointer",
    },
    buttonContainer: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      width: "100%",
    },
    viewButtonHover: {
      background: "#35408E",
      color: "white",
    },
    viewButton: {
      border: "1px solid #35408E",
    },
    sortButton: {
      display: "flex",
      alignItems: "center",
      top: "170px",
      right: "10px",
      gap: "5px",
      border: "1px solid #35408E",
      padding: "6px 12px",
      height: "45px",
      marginRight: "160px",
      background: "white",
      color: "#35408E",
      position: "fixed",
      width: "110px",
    },
    sortButtonHover: {
      background: "#35408E",
      color: "white",
    },
    userIcon: {
      color: "#35408E",
      cursor: "pointer",
      position: "fixed",
      top: "175px",
      right: "110px",
      zIndex: "999",
    },
  };

  return (
    <div className="mt-[8rem] ml-0 md:ml-[260px] flex flex-col px-4 md:px-10 pb-4">
      {loading ? (
        <>
          <button
            onClick={() => setIsModalOpen(true)}
            className="h-auto w-fit flex text-sm md:text-base items-center gap-2 text-white rounded-md bg-[#35408E] px-3 py-2"
          >
            <UserPlus />
            <span>Add Staff</span>
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
          <div className="flex justify-between items-center gap-4 flex-wrap">
            <div className="flex flex-col gap-3 items-start">
              <button
                onClick={() => setIsModalOpen(true)}
                className="h-auto w-fit flex text-sm md:text-base items-center gap-2 text-white rounded-md bg-[#35408E] px-3 py-2"
              >
                <UserPlus />
                <span>Add Staff</span>
              </button>

              <div style={styles.buttonContainer}>
                <button
                  style={styles.viewButton}
                  className="flex items-center py-1 px-2 text-[#35408E] bg-white w-fit h-auto text-sm md:text-base"
                >
                  <BadgeCheck size={18} />
                  View
                </button>
                <button
                  style={styles.viewButton}
                  className="flex items-center py-1 px-2 text-[#35408E] bg-white w-fit h-auto text-sm md:text-base"
                >
                  <Filter size={18} />
                  Sort By
                </button>
              </div>
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder="Search users"
                style={styles.searchInput}
              />
              <Search style={styles.searchIcon} size={18} />
            </div>
          </div>

          {staff.length === 0 ? (
            <div className="text-center uppercase text-xl md:text-2xl text-gray-600 font-semibold py-10">
              No Staff listed yet.
            </div>
          ) : (
            <StaffInfo
              staff={staff}
              onEdit={(id) => navigate(`/staff/edit/${id}`)}
            />
          )}
          {isModalOpen && (
            <AddUser
              onClose={() => setIsModalOpen(false)}
              onSuccess={() => {
                fetchStaff();
                setIsModalOpen(false);
              }}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Staff;
