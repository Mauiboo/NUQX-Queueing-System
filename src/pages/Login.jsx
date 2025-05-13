import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles.css";
import Logo from "../images/NULogo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);

        switch (data.role) {
          case "staff":
            navigate("/staff/managequeue");
            break;
          case "kiosk":
            navigate("/kiosk");
            break;
          case "display":
            navigate("/monitordisplay/MonitorDisplay");
            break;
          case "departmentHead":
            navigate("/departmenthead/dashboard");
            break;
          default:
            alert("Unknown role");
        }
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("An error occurred during login.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
      padding: "0 20px",
      borderBottom: "8px solid #FFD41C",
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
    footer: {
      position: "relative",
      width: "100%",
      backgroundColor: "#35408E",
      height: "75px",
      borderTop: "8px solid #FFD41C",
    },
    mainContent: {
      margin: "0 auto",
      padding: "20px 0",
      position: "relative",
    },
    logoContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      lineHeight: 1,
    },
    loginContainer: {
      padding: "30px 20px",
      backgroundColor: "white",
      borderRadius: "30px",
      border: "1px solid #35408E",
      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.15)",
      width: "90%",
      maxWidth: "480px",
    },

    passwordToggleStyle: {
      position: "absolute",
      right: "15px",
      top: "50%",
      transform: "translateY(-50%)",
      cursor: "pointer",
      color: "#666666",
      background: "none",
      border: "none",
      padding: "0",
      fontSize: "16px",
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
    },
  };

  return (
    <div className="flex flex-col lg:fixed w-full min-h-screen lg:min-h-full h-full lg:h-screen lg:overflow-hidden">
      <main className="flex flex-col justify-start lg:justify-between flex-1 h-full">
        <div className="fixed-top lg:!relative">
          <header style={styles.header}>
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
          </header>
        </div>
        <div
          style={styles.loginContainer}
          className="mt-[9rem] lg:mt-0 mb-6 mx-auto"
        >
          <h2 className=" text-xl text-[#333333] md:text-2xl xl:text-[2.2rem] text-center mb-8">
            Welcome to NUQX
          </h2>
          <form onSubmit={handleLogin}>
            <div className="input-group" style={{ marginBottom: "30px" }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                className="!h-[40px] !text-[13px] xl:!h-[43px] xl:!text-[15px]"
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  borderRadius: "25px",
                }}
              />
            </div>
            <div className="input-group" style={{ marginBottom: "30px" }}>
              <div style={{ position: "relative", width: "100%" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                  className="!h-[40px] !text-[13px] xl:!h-[43px] xl:!text-[15px]"
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    borderRadius: "25px",
                  }}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="!text-[13px] xl:!text-[15px]"
                  style={{
                    ...styles.passwordToggleStyle,
                    zIndex: 2,
                    width: "70px",
                    right: "20px",
                    pointerEvents: "auto",
                  }}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            <button
              type="submit"
              style={{
                borderRadius: "25px",
                fontSize: "18px",
                height: "40px",
                marginBottom: "30px",
              }}
            >
              Log in
            </button>
            <div
              className="forgot-password text-center text--sm md:text-base"
              style={{
                buttonHover: "blue",
              }}
            >
              <a href="#">Forgot Password</a>
            </div>
          </form>
        </div>
        <footer className="hidden lg:block" style={styles.footer}></footer>
      </main>
      <footer className="block lg:hidden" style={styles.footer}></footer>
    </div>
  );
};

export default Login;
