import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../Style.css";
import LogoutModal from "./LogoutModal";
import { Icon } from "@iconify/react";
import Logo from "../../../../images/NULogo.png";
import Modal from "./Modal";

function StartPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleConfirmLogout = () => {
    setShowLogoutConfirm(false);
    navigate("/login");
  };

  const handleCancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  useEffect(() => {
    if (!userDetails?.userType || !state?.department) {
      navigate("/kiosk/department");
      return;
    }
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
          body: JSON.stringify({ selectedDepartment: state?.department }),
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
      console.error(error);
      alert("An error occurred. Please refresh the page.");
    }
  };

  const handleOpenModal = (transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleBack = () => {
    navigate("/kiosk/department");
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const userDetails = {
    concern: selectedTransaction?.name,
    userType: state?.userType,
  };

  const styles = {
    pageContainer: {
      overflow: "hidden",
      position: "fixed",
      width: "100%",
      height: "100vh",
    },
    header: {
      backgroundColor: "#35408E",
      height: "80px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 20px",
    },
    logoContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      lineHeight: 1,
    },
    logo: {
      height: "90px",
      marginRight: "10px",
    },
    headerTitle: {
      color: "#FFFFFF",
      fontSize: "35px",
      fontFamily: "'ClanOT Medium', sans-serif",
    },
    yellowLine: {
      backgroundColor: "#FFD41C",
      height: "8px",
      width: "100%",
    },
    footer: {
      position: "relative",
      width: "100%",
      backgroundColor: "#35408E",
      height: "75px",
      borderTop: "8px solid #FFD41C",
    },
    buttonContainer: {
      marginTop: "50px",
      display: "flex",
      flexWrap: "wrap",
      padding: "0 .5rem",
      justifyContent: "center",
      gap: "20px",
    },
  };

  return (
    <div>
      <main className="flex flex-col flex-1 min-h-screen">
        <header className="header fixed-top d-flex align-items-center justify-between !border-b-[8px] !border-b-[#FFD41C]">
          <div style={styles.logoContainer}>
            <div
              className="ml-[5px] md:ml-0"
              style={{ display: "flex", alignItems: "center" }}
            >
              <img
                className="max-h-[100px] w-20 md:w-full mr-[6px]"
                src={Logo}
                alt="NU Logo"
              />
              <h1 className="text-white text-[1.5rem] mt-2 md:text-[2rem] font-[200]">
                NUQX
              </h1>
            </div>
          </div>
          {showLogoutConfirm && (
            <LogoutModal
              show={showLogoutConfirm}
              onClose={handleCancelLogout}
              onConfirm={handleConfirmLogout}
            />
          )}
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="w-fit rounded-lg px-3 py-1 z-9999 text-lg"
          >
            Logout
          </button>
        </header>

        <div className="mt-[9rem]">
          <h2 className="text-[1.7rem] px-4 text-center sm:text-[2.5rem] font-bold uppercase">
            Hello, <br /> What will you do today?
          </h2>

          {loading ? (
            <div className="flex justify-center items-center h-[50vh]">
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
                <p className="text-[#35408E] font-semibold">Loading...</p>
              </div>
            </div>
          ) : (
            <>
              {transactions.length === 0 ||
              transactions.every((tx) => tx.isHidden === true) ? (
                <div className="h-[50vh] flex items-center justify-center">
                  <span className="text-center uppercase text-xl md:text-2xl text-gray-600 font-semibold py-10">
                    No transactions listed yet.
                  </span>
                </div>
              ) : (
                <div className="flex flex-wrap items-center justify-center mt-6 gap-4 px-4">
                  {transactions
                    .filter((transaction) => !transaction.isHidden)
                    .map((transaction, index) => (
                      <>
                        <div key={index}>
                          <button
                            className="icon-button"
                            onClick={() => handleOpenModal(transaction)}
                          >
                            <Icon
                              icon={`mdi:${transaction.icon}`}
                              className="h-[100px] text-white sm:h-[140px] w-[100px] sm:w-[140px]"
                            />
                            <span className="button-text">
                              {transaction.name}
                            </span>
                          </button>
                        </div>
                        {selectedTransaction && (
                          <Modal
                            isOpen={isModalOpen}
                            onClose={handleModalClose}
                            isIDReset={selectedTransaction.isIDReset}
                            transactionName={selectedTransaction.name}
                            transactionID={selectedTransaction.transactionID}
                            userType={userDetails.userType}
                            department={state?.department}
                            details={{
                              ...userDetails,
                              concern: selectedTransaction.name,
                            }}
                          />
                        )}
                      </>
                    ))}
                </div>
              )}
            </>
          )}
          <div className="action-buttons mb-4 mt-6 text-center">
            <button
              onClick={handleBack}
              style={{
                width: "150px",
                height: "50px",
                fontSize: "16px",
                padding: "10px",
                borderRadius: "25px",
                backgroundColor: "#FFD41C",
                color: "#35408E",
                border: "none",
                cursor: "pointer",
                margin: "0 10px",
              }}
            >
              Back
            </button>
          </div>
        </div>
      </main>

      <footer style={styles.footer}></footer>
    </div>
  );
}

export default StartPage;
