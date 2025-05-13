import React from "react";
import QueuePerformance from "../Dashboard/QueuePerformance";

const Dashboard = () => {
  return (
    <>
      <div className="dashboard-container mt-[9rem] ml-0 md:ml-[260px] flex flex-col">
        <QueuePerformance />
      </div>
    </>
  );
};

export default Dashboard;
