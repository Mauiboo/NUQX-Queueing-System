import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../../../images/NULogo.png";
import registrarIcon from "../../../../images/edit-2.png";
import admissionsIcon from "../../../../images/teacher.png";
import applicationIcon from "../../../../images/applicationGuideIcon.png";
import inquiryIcon from "../../../../images/inquiryGuideIcon.png";
import accountingIcon from "../../../../images/card-tick.png";
import { Link } from "react-router-dom";
import { FaBullseye } from "react-icons/fa6";
import ModalGuide from "./ModalGuide";

function Step3Guide() {
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
      width: "60%",
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
    },
    p1: {
      fontSize: "200px",
      color: "#2d3b8c",
      marginTop: "-120px",
      maxWidth: "700px",
      lineHeight: 1.4,
      position: "relative",
      marginLeft: "250px",
      top: "350px",
      fontWeight: "bold",
    },
    p: {
      fontSize: "40px",
      color: "#2d3b8c",
      marginTop: "-120px",
      maxWidth: "700px",
      lineHeight: 1.4,
      position: "relative",
      marginLeft: "250px",
      top: "470px",
    },
    homepageBtn: {
      backgroundColor: "#2d3b8c",
      color: "white",
      border: "none",
      padding: ".5rem 1rem",
      borderRadius: "10px",
      cursor: "pointer",
      transition: "background-color 0.3s ease-in-out",
      width: "100px",
    },
    content: {
      position: "relative",
      top: "-70px",
    },
  };

  return (
    <div className="flex flex-col xl:fixed w-full min-h-screen xl:min-h-full h-full xl:h-screen xl:overflow-hidden">
      <main className="flex flex-col justify-start xl:justify-between flex-1 h-full">
        <div>
          <header style={styles.header}></header>
          <div className="flex flex-row">
            <div className="bg-[#35408e] h-[8px] hidden xl:block w-[40%]"></div>
            <div className="bg-[#FFD41C] h-[8px] w-full xl:w-[60%] float-right"></div>
          </div>
        </div>
        <div className="flex flex-col xl:flex-row h-full items-center  w-full mx-auto">
          <div className="flex flex-col items-center text-white grow bg-[#35408e] xl:h-full w-full xl:w-[40%]  justify-center xl:justify-evenly px-4">
            <div className="flex flex-row items-center gap-[6px] mr-3 xl:mr-0">
              <img
                className="max-h-[100px] !w-24 xl:w-full"
                src={Logo}
                alt="NU Logo"
              />

              <h1 className="text-2xl font-bold uppercase xl:text-5xl">
                Review your info
              </h1>
            </div>

            <ol
              start={3}
              className="text-2xl xl:text-4xl xl:ml-0 list-decimal list-inside"
            >
              <li>
                <b className="whitespace-nowrap">Review your info:</b>
                <div className="pl-6 xl:pl-10 pt-1">
                  A message will show what you picked — confirm or go back.
                </div>
              </li>
            </ol>
            <div className="flex gap-3 self-center xl:self-end mb-4 xl:mb-0">
              <Link
                to="/help/2"
                className="bg-[#35408e] text-center px-6 py-3 hover:underline hover:!text-white rounded-md text-base xl:text-lg self-right shadow-md border border-white/30"
              >
                &lt; Previous Step
              </Link>
              <Link
                to="/help/4"
                className="bg-[#35408e] text-center px-6 py-3 hover:underline hover:!text-white rounded-md text-base xl:text-lg self-right shadow-md border border-white/30"
              >
                Next Step &gt;
              </Link>
            </div>
          </div>

          <div className="flex flex-col relative w-full h-full grow xl:w-[60%] items-center justify-center gap-4 pb-5 p-4">
            <h2 className="text-[1.7rem] px-4 text-center text-black sm:text-[2.5rem] font-bold uppercase">
              Hello, <br /> What will you do today?
            </h2>
            <div className="flex flex-row gap-4 flex-wrap items-center justify-center ">
              <div>
                <div className="bg-[#35408e] flex flex-col items-center justify-center rounded-2xl text-white border-none px-3 py-4  w-[11rem] h-[11rem] xl:!w-[14rem] xl:!h-[14rem]">
                  <img
                    src={applicationIcon}
                    className="h-[70px] xl:h-[110px] w-[70px] xl:w-[110px]"
                    alt="Application icon"
                  />
                  <span className="text-lg xl:text-2xl">Application</span>
                </div>
              </div>
              <div>
                <div className="bg-[#35408e] flex flex-col items-center justify-center rounded-2xl text-white border-none px-3 py-4  w-[11rem] h-[11rem] xl:!w-[14rem] xl:!h-[14rem]">
                  <img
                    src={inquiryIcon}
                    className="h-[70px] xl:h-[110px] w-[70px] xl:w-[110px]"
                    alt="Inquiry icon"
                  />
                  <span className="text-lg xl:text-2xl">Inquiry</span>
                </div>
              </div>
            </div>
            <div className="action-buttons !mt-0 text-center">
              <button
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
            <ModalGuide />
          </div>
        </div>
        <footer className="hidden xl:block" style={styles.footer}></footer>
      </main>
      <footer className="block xl:hidden" style={styles.footer}></footer>
    </div>
  );
}

export default Step3Guide;
