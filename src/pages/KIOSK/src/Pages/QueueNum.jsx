import React, { useEffect, useState, useRef } from "react";
import "../base.css";
import Logo from "../../../../images/NULogo.png";
import { useNavigate, useLocation } from "react-router-dom";
import LogoutModal from "./LogoutModal";

function QueueNum() {
  const navigate = useNavigate();
  const location = useLocation();

  const queueNumber = location.state?.queueNumber;
  const dateCreated = location.state?.dateCreated;
  const formattedDate = dateCreated
    ? new Date(dateCreated).toLocaleDateString("en-US", {
        year: "2-digit",
        month: "2-digit",
        day: "2-digit",
      })
    : "";
  console.log(location?.state?.queueNumber);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

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

  const styles = {
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
  };

  useEffect(() => {
    if (!queueNumber) {
      navigate("/startpage");
      return;
    }
  }, []);

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

        <div
          style={{
            display: "flex",
            marginTop: "9rem",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "1.2rem",
          }}
        >
          <h1 className="text-[2rem] xl:text-[3rem] text-center text-[#333] mb-6 px-4">
            Thank you for using NUQX!
          </h1>

          <div
            className="bg-white rounded-xl mb-8 w-[90%] sm:w-fit px-[15px] py-[30px] sm:px-[100px] xl:py-[50px]"
            style={{
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
            }}
          >
            <p className="text-[#333] text-[1.5rem] text-center xl:text-[2.5rem]">
              Your Ticket Number Is
            </p>
            <p className="text-[3rem] text-center xl:text-[5rem] font-bold text-[#35408E]">
              {queueNumber}
            </p>
            <div className="flex justify-center">
              <span className="italic text-xl md:text-2xl text-center font-semibold">
                {formattedDate}
              </span>
            </div>
          </div>

          <button
            onClick={handleDoneClick}
            className="bg-[#35408E] text-white py-[5px] px-[20px] sm:py-[10px] sm:px-[40px] rounded-3xl text-lg sm:text-2xl w-[100px] sm:w-[200px]"
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#283069")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#35408E")
            }
          >
            DONE
          </button>
        </div>
      </main>

      <footer style={styles.footer}></footer>
    </div>
  );
}

export default QueueNum;
