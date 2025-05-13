import "./styles.css";
import NULogo from "./images/NU Logo.png";
import React, { useState, useEffect } from "react";
import LogoutModal from "../../KIOSK/src/Pages/LogoutModal";
import { useNavigate, useLocation } from "react-router-dom";
const MonitorDisplay = () => {
  const navigate = useNavigate();
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
    yellowLine1: {
      backgroundColor: "#FFD41C",
      height: "8px",
      width: "100%",
      position: "relative",
      marginTop: "-54px",
    },
    footer: {
      position: "relative",
      width: "100%",
      backgroundColor: "#35408E",
      height: "75px",
      borderTop: "8px solid #FFD41C",
    },
  };

  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [queueNumbers, setQueueNumbers] = useState([]);
  const [latestProcessing, setLatestProcessing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [latestQueue, setLatestQueue] = useState(null);

  const handleDoneClick = () => {
    navigate("/kiosk");
  };

  const handleConfirmLogout = () => {
    setShowLogoutConfirm(false);
    navigate("/login");
  };

  const handleCancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  const fetchQueueNumbers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:5000/api/auth/queue-numbers",
        {
          headers: {
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

        const allQueue = data.queueNumbers || [];

        const processingQueues = allQueue
          .filter((q) => q.status === "Processing")
          .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

        // Get the 3 latest processing queues
        const latestThreeProcessing = processingQueues.slice(1, 3);

        const latestQueue = processingQueues[0] || null;
        setLatestProcessing(latestThreeProcessing);
        setQueueNumbers(processingQueues);
        setLatestQueue(latestQueue);

        setLoading(false);
      } else {
        alert("An error occurred. Please refresh the page.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred. Please refresh the page.");
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      fetchQueueNumbers();
    }, 3000); // every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="lg:fixed w-full h-full lg:h-screen lg:overflow-hidden">
        <main className="flex flex-col flex-1 justify-between h-full">
          <div>
            <header style={styles.header}>
              <div style={styles.logoContainer}>
                <div
                  className="ml-[5px] md:ml-0"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <img
                    className="max-h-[100px] w-20 md:w-full mr-[6px]"
                    src={NULogo}
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
            <div style={styles.yellowLine}></div>
          </div>
          {loading ? (
            <>
              <div className="flex justify-center items-center h-[50vh]">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
                  <p className="text-[#35408E] font-semibold">Loading...</p>
                </div>
              </div>
            </>
          ) : (
            <>
              {queueNumbers.length === 0 ? (
                <div className="flex items-center justify-center py-10">
                  <span className="uppercase text-2xl md:text-5xl text-gray-600 font-semibold">
                    No tickets are being served
                  </span>
                </div>
              ) : (
                <div className="main-content-monitor">
                  <div className="queue-container">
                    <div className="left-section">
                      <div className="serving-box">
                        <div className="serving-header">Now Serving</div>
                        {latestQueue ? (
                          <div className="serving-content">
                            <div className="proceed-text">
                              PLEASE PROCEED TO:
                            </div>
                            <div className="window-box">
                              WINDOW {latestQueue?.windowNumber}
                            </div>

                            <div
                              className="queue-number"
                              style={{ marginTop: "0", paddingTop: "0" }}
                            >
                              {latestQueue?.generatedQueuenumber}
                            </div>
                          </div>
                        ) : (
                          <span className="text-2xl md:text-4xl">N/A</span>
                        )}
                      </div>
                    </div>

                    <div className="right-section">
                      {/* <div className="serving-header mb-4">Waiting</div> */}
                      <div className="main-window-container">
                        {[
                          ...latestProcessing,
                          ...Array(3 - latestProcessing.length).fill(null),
                        ].map((queueNum, index, arr) => (
                          <React.Fragment key={index}>
                            <div className="window-container">
                              <div className="window-box">
                                WINDOW {queueNum?.windowNumber || "N/A"}
                              </div>
                              <div className="queue-number">
                                {queueNum?.generatedQueuenumber || "N/A"}
                              </div>
                            </div>
                            {index < arr.length - 1 && (
                              <div className="horizontal-divider"></div>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          <footer style={styles.footer}></footer>
        </main>
      </div>
    </>
  );
};

export default MonitorDisplay;
