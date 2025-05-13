import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { FileText } from "lucide-react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import { FaTimes } from "react-icons/fa";
Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Reports() {
  const [timePeriod, setTimePeriod] = useState("Today");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const reportData = {
    Today: {
      transactions: 150,
      avgTurnaround: "00:12:08",
      peakHour: "1PM - 2PM",
      peakActivity: "Enrollment",
      chartLabels: ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM"],
      chartData: [0.08, 0.12, 0.15, 0.22, 0.28, 0.2, 0.14, 0.1],
    },
    "This Week": {
      transactions: 980,
      avgTurnaround: "00:14:32",
      peakHour: "Monday",
      peakActivity: "Registration",
      chartLabels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      chartData: [0.18, 0.14, 0.15, 0.12, 0.22, 0.1, 0.05],
    },
    "This Month": {
      transactions: 3250,
      avgTurnaround: "00:13:45",
      peakHour: "Week 2",
      peakActivity: "Enrollment",
      chartLabels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      chartData: [0.14, 0.25, 0.18, 0.12],
    },
    "This Year": {
      transactions: 42680,
      avgTurnaround: "00:15:11",
      peakHour: "April",
      peakActivity: "Registration",
      chartLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
      chartData: [0.1, 0.12, 0.14, 0.24, 0.18, 0.15, 0.11, 0.09],
    },
  };

  const currentData = reportData[timePeriod];

  const chartData = {
    labels: currentData.chartLabels,
    datasets: [
      {
        label: "Avg. Turnaround Time",
        data: currentData.chartData.map((time) => time * 30),
        fill: false,
        backgroundColor: "#35408E",
        borderColor: "#35408E",
        tension: 0.4,
        pointRadius: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        min: 0,
        max: 30,
        ticks: {
          stepSize: 5,
          callback: function (value) {
            const minutes = Math.floor(value);
            return minutes < 10 ? `00:0${minutes}` : `00:${minutes}`;
          },
          color: "#35408E",
          font: {
            size: 18,
            weight: "bold",
          },
        },
        grid: {
          display: false,
        },
      },
      x: {
        ticks: {
          color: "#35408E",
          font: {
            size: 18,
            weight: "bold",
          },
        },
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const Dialog = ({ onClose }) => {
    const currentDate = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const avgWaitTimeMinutes = Math.floor(
      parseFloat(currentData.avgTurnaround.split(":")[1])
    );
    const longestWaitTime = Math.min(30, avgWaitTimeMinutes * 2.5);
    const shortestWaitTime = Math.max(1, avgWaitTimeMinutes * 0.4);

    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 999,
        }}
      >
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "2rem",
            boxShadow: "0 8px 30px rgba(0, 0, 0, 0.3)",
            zIndex: 9999,
            borderRadius: "8px",
            width: "90%",
            maxHeight: "90vh",
            overflowY: "auto",
            maxWidth: "450px",
          }}
        >
          <div style={{ position: "relative", marginBottom: "1.5rem" }}>
            <div className="flex justify-between items-center">
              <h2 className="text-2xl" style={{ color: "#35408E", margin: 0 }}>
                Report Details
              </h2>
              <button className="close-button" onClick={onClose}>
                <FaTimes />
              </button>
            </div>
          </div>

          <div
            style={{
              borderTop: "1px solid #e0e0e0",
              borderBottom: "1px solid #e0e0e0",
              padding: "1rem 0",
              marginBottom: "1.5rem",
            }}
          >
            <p className="text-sm md:text-base" style={{ margin: "0.5rem 0" }}>
              <strong>Date Generated:</strong> {currentDate}
            </p>
            <p className="text-sm md:text-base" style={{ margin: "0.5rem 0" }}>
              <strong>Generated By:</strong> Damon Salvatore
            </p>
            <p className="text-sm md:text-base" style={{ margin: "0.5rem 0" }}>
              <strong>Department:</strong> Registrar
            </p>
          </div>

          <div
            className="text-sm md:text-base"
            style={{ marginBottom: "1.5rem" }}
          >
            <p style={{ margin: "0.5rem 0" }}>
              <strong>Total Queues Processed:</strong>{" "}
              {currentData.transactions}
            </p>
            <p className="text-sm md:text-base" style={{ margin: "0.5rem 0" }}>
              <strong>Average Wait Time:</strong> {avgWaitTimeMinutes} mins
            </p>
            <p className="text-sm md:text-base" style={{ margin: "0.5rem 0" }}>
              <strong>Peak Hours:</strong> {currentData.peakHour}
            </p>
            <p className="text-sm md:text-base" style={{ margin: "0.5rem 0" }}>
              <strong>Most Frequent Service Requests:</strong>{" "}
              {currentData.peakActivity}
            </p>
            <p className="text-sm md:text-base" style={{ margin: "0.5rem 0" }}>
              <strong>Longest Wait Time:</strong> {Math.round(longestWaitTime)}{" "}
              mins
            </p>
            <p className="text-sm md:text-base" style={{ margin: "0.5rem 0" }}>
              <strong>Shortest Wait Time:</strong>{" "}
              {Math.round(shortestWaitTime)} mins
            </p>
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              className="text-sm md:text-base"
              style={{
                backgroundColor: "#35408E",
                color: "white",
                padding: "0.75rem 1rem",
                borderRadius: "5px",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                width: "180px",
                justifyContent: "center",
              }}
            >
              <FileText color="white" size={18} /> Download PDF
            </button>
          </div>
        </div>
      </div>
    );
  };

  const DownloadButton = () => {
    return (
      <button
        className={`text-sm md:text-base p-[.5rem] md:p-[.75rem] ${
          isDialogOpen ? "hidden" : "flex"
        }`}
        onClick={() => setIsDialogOpen(true)}
        style={{
          backgroundColor: "#35408E",
          color: "white",
          alignItems: "center",
          gap: "0.5rem",
          border: "none",
          cursor: "pointer",
          marginTop: "9px",
          alignSelf: "end",
          height: "50px",
          width: "200px",
          justifyContent: "center",
          borderRadius: "5px",
          whiteSpace: "nowrap",
        }}
      >
        <FileText color="white" />
        Download Report
      </button>
    );
  };

  return (
    <div className="reports-container mt-[8rem] ml-0 md:ml-[260px] flex flex-col px-4 md:px-10 pb-4">
      <div
        className="reports-header"
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          marginBottom: "2rem",
          gap: "4rem",
          flexWrap: "wrap",
        }}
      >
        <div className="time-period-selector">
          <select
            className="rounded-md"
            value={timePeriod}
            onChange={(e) => setTimePeriod(e.target.value)}
            style={{
              padding: "0.5rem 1rem",
              color: "white",
              backgroundColor: "#35408E",
              cursor: "pointer",
              width: "200px",
            }}
          >
            <option value="Today">Today</option>
            <option value="This Week">This Week</option>
            <option value="This Month">This Month</option>
            <option value="This Year">This Year</option>
          </select>
        </div>

        {/* Summary Boxes */}
        <div className="summary-boxes gap-[2rem] relative grid grid-cols-1 xs:grid-cols-2 place-items-start items-stretch">
          <div
            className="summary-box w-full h-full"
            style={{
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            }}
          >
            <h4
              className="box-header text-sm md:text-lg"
              style={{
                backgroundColor: "#35408E",
                color: "white",
                padding: "0.5rem",
                textAlign: "center",
              }}
            >
              NUMBER OF TRANSACTIONS
            </h4>
            <div
              className="box-content text-xs md:text-base"
              style={{
                padding: "0.8rem",
                textAlign: "center",
                color: "black",
              }}
            >
              {currentData.transactions}
            </div>
          </div>
          <div
            className="summary-box w-full h-full"
            style={{
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            }}
          >
            <h4
              className="box-header text-sm md:text-lg"
              style={{
                backgroundColor: "#35408E",
                color: "white",
                padding: "0.5rem",
                textAlign: "center",
              }}
            >
              AVG. TURNAROUND TIME
            </h4>
            <div
              className="box-content text-xs md:text-base"
              style={{
                padding: "0.8rem",
                textAlign: "center",
                color: "black",
              }}
            >
              {currentData.avgTurnaround}
            </div>
          </div>
          <div
            className="summary-box w-full h-full"
            style={{
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            }}
          >
            <h4
              className="box-header text-sm md:text-lg"
              style={{
                backgroundColor: "#35408E",
                color: "white",
                padding: "0.5rem",
                textAlign: "center",
              }}
            >
              BUSIEST HOUR
            </h4>
            <div
              className="box-content text-xs md:text-base"
              style={{
                padding: "0.8rem",
                textAlign: "center",
                color: "black",
              }}
            >
              {currentData.peakHour}
            </div>
          </div>
          <div
            className="summary-box w-full h-full"
            style={{
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            }}
          >
            <h4
              className="box-header text-sm md:text-lg"
              style={{
                backgroundColor: "#35408E",
                color: "white",
                padding: "0.5rem",
                textAlign: "center",
              }}
            >
              MOST FREQUENT CONCERN
            </h4>
            <div
              className="box-content text-xs md:text-base"
              style={{
                padding: "0.8rem",
                textAlign: "center",
                color: "black",
              }}
            >
              {currentData.peakActivity}
            </div>
          </div>
        </div>
      </div>
      <div className="chart-container px-4 h-[20rem] relative flex flex-col gap-[2rem] items-center justify-center w-full mx-auto mt-10">
        <Line data={chartData} options={chartOptions} />
        <span className="avg-turnaround text-center text-[#35408E] text-sm md:text-lg mb-5">
          AVG. TURNAROUND TIME: {currentData.avgTurnaround}
        </span>
      </div>

      {isDialogOpen && <Dialog onClose={() => setIsDialogOpen(false)} />}
      <DownloadButton />
    </div>
  );
}

export default Reports;
