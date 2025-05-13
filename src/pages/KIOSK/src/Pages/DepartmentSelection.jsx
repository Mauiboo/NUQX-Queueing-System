import { useNavigate, useLocation } from "react-router-dom";
import "../Style.css";
import Logo from "../../../../images/NULogo.png";
import registrarIcon from "../../../../images/edit-2.png";
import admissionsIcon from "../../../../images/teacher.png";
import accountingIcon from "../../../../images/card-tick.png";
import BackgroundImage from "../../../../images/NU-Manila.svg";
import LogoutModal from "./LogoutModal";
import { useState, useEffect } from "react";
import { RiLogoutCircleLine } from "react-icons/ri";

function DepartmentSelection() {
  const navigate = useNavigate();

  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const { state } = useLocation();

  const handleStart = (department) => {
    navigate("/startpage", {
      state: { department, userType: state?.userType },
    });
  };

  const handleConfirmLogout = () => {
    setShowLogoutConfirm(false);
    navigate("/login");
  };

  const handleCancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  const handleBack = () => {
    navigate("/mainpage");
  };

  useEffect(() => {
    if (!state?.userType) {
      navigate("/kiosk");
      return;
    }
  }, []);

  const styles = {
    pageContainer: {
      overflow: "hidden",
      position: "fixed",
      width: "100%",
      height: "100vh",
      backgroundColor: "#fff",
    },
    background: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundImage: `url(${BackgroundImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      opacity: 0.6,
      zIndex: -1,
    },
    header: {
      backgroundColor: "#35408E",
      height: "80px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 20px",
      positon: "fixed",
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
          <div className="mt-10 text-center">
            <h2 className="text-[1.7rem] px-4 sm:text-[2.5rem] font-bold uppercase">
              Choose Department:
            </h2>
          </div>

          <div className="flex flex-wrap items-center justify-center mt-6 gap-4 px-4">
            <div>
              <button
                className="icon-button"
                onClick={() => handleStart("registrar")}
              >
                <img
                  src={registrarIcon}
                  className="h-[80px] sm:h-[120px] w-[80px] sm:w-[120px]"
                  alt="Transaction icon"
                />
                <span className="button-text">Registrar</span>
              </button>
            </div>
            <div>
              <button
                className="icon-button"
                onClick={() => handleStart("accounting")}
              >
                <img
                  src={accountingIcon}
                  className="h-[80px] sm:h-[120px] w-[80px] sm:w-[120px]"
                  alt="Accounting icon"
                />
                <span className="button-text">Accounting</span>
              </button>
            </div>
            <div>
              <button
                className="icon-button"
                onClick={() => handleStart("admissions")}
              >
                <img
                  src={admissionsIcon}
                  className="h-[80px] sm:h-[120px] w-[80px] sm:w-[120px]"
                  alt="Admissions icon"
                />
                <span className="button-text">Admissions</span>
              </button>
            </div>
          </div>

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

export default DepartmentSelection;
