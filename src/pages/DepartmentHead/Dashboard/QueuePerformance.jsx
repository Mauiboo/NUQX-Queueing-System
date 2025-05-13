import React from "react";
import icon1 from "../../../images/icon1.svg";
import icon2 from "../../../images/icon2.svg";
import icon3 from "../../../images/icon3.svg";
import "@fortawesome/fontawesome-free/css/all.min.css";

const QueuePerformance = () => {
  return (
    <div className="px-4 md:px-10 pb-4">
      <h1 className="text-center bg-[#35408e] text-[1rem] md:text-[2rem] p-[15px] rounded-xl border-[2px] border-black text-white">
        Welcome to your Dashboard
      </h1>
      <div className="flex justify-between flex-wrap items-center my-6 md:my-10">
        <h3 className="text-base md:text-2xl font-[200] uppercase">
          Queue Performance Analysis
        </h3>

        <div className="bg-[#35408e] flex items-center w-fit h-fit border-[2px] border-black text-white px-4 py-2 rounded-xl">
          <span className="py-[3px] px-2 rounded-lg text-base md:text-2xl">
            2:00 PM
          </span>
          <span>Peak Hour</span>
        </div>
      </div>

      <div className="flex justify-center items-center flex-wrap gap-[6rem] mt-[6rem]">
        <div className="flex relative flex-col items-center justify-center border-[2px] border-black rounded-lg p-4 bg-[#35408e] text-white w-[10rem] md:w-[15rem] h-[10rem] md:h-[15rem] text-center">
          <img
            src={icon1}
            alt="Longest Wait Icon"
            style={{
              width: "45%",
              position: "absolute",
              top: "-60px",
              left: "90%",
              transform: "translateX(-50%)",
            }}
          />
          <div className="mt-1 font-bold text-[2rem] md:text-[3rem]">30:34</div>
          <div className="mt-1 text-sm md:text-xl">
            Longest Wait Time Recorded
          </div>
        </div>
        <div className="flex relative flex-col items-center justify-center border-[2px] border-black rounded-lg p-4 bg-[#35408e] text-white w-[10rem] md:w-[15rem] h-[10rem] md:h-[15rem] text-center">
          <img
            src={icon2}
            alt="Longest Wait Icon"
            style={{
              width: "45%",
              position: "absolute",
              top: "-60px",
              left: "90%",
              transform: "translateX(-50%)",
            }}
          />
          <div className="mt-1 font-bold text-[2rem] md:text-[3rem]">12:08</div>
          <div className="mt-1 text-sm md:text-xl">
            Shortest Wait Time Recorded
          </div>
        </div>
        <div className="flex relative flex-col items-center justify-center border-[2px] border-black rounded-lg p-4 bg-[#35408e] text-white w-[10rem] md:w-[15rem] h-[10rem] md:h-[15rem] text-center">
          <img
            src={icon3}
            alt="Longest Wait Icon"
            style={{
              width: "45%",
              position: "absolute",
              top: "-60px",
              left: "90%",
              transform: "translateX(-50%)",
            }}
          />
          <div className="mt-1 font-bold text-[2rem] md:text-[3rem]">22</div>
          <div className="mt-1 text-sm md:text-xl">
            Avg. Number of Clients Served per Hour
          </div>
        </div>
      </div>
    </div>
  );
};

export default QueuePerformance;
