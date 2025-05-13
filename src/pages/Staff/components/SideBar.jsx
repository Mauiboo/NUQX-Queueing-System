import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./sideBar.css";
import {
  RiBarChartFill,
  RiSettings4Line,
  RiLogoutCircleLine,
} from "react-icons/ri";
import Modal from "./Modal";
import { MdOutlineQueuePlayNext } from "react-icons/md";

function SideBar() {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const handleConfirmLogout = () => {
    setShowLogoutConfirm(false);
    navigate("/login");
  };

  const handleCancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  // Function to determine if the link is active
  const getActiveClass = (path) => {
    return location.pathname === path ? "active-link" : "";
  };

  return (
    <>
      {/* Hamburger Button */}
      <button className="hamburger" onClick={toggleSidebar}>
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Background Overlay */}
      {isSidebarOpen && <div className="overlay" onClick={closeSidebar}></div>}

      {/* Sidebar */}
      <aside id="sidebar" className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="divider bottom"></div>
        <ul className="sidebar-nav-staff" id="sidebar-nav">
          <li className={`nav-item ${getActiveClass("/staff/managequeue")}`}>
            <Link
              to="/staff/managequeue"
              className="nav-link"
              onClick={closeSidebar}
            >
              <MdOutlineQueuePlayNext className="me-2" />
              <span>Manage Queue</span>
            </Link>
          </li>

          <li className={`nav-item ${getActiveClass("/staff/reports")}`}>
            <Link
              to="/staff/reports"
              className="nav-link"
              onClick={closeSidebar}
            >
              <RiBarChartFill className="me-2" />
              <span>Reports</span>
            </Link>
          </li>

          <li className={`nav-item ${getActiveClass("/staff/settings")}`}>
            <Link
              to="/staff/settings"
              className="nav-link"
              onClick={closeSidebar}
            >
              <RiSettings4Line className="me-2" />
              <span>Settings</span>
            </Link>
          </li>

          <li className="nav-item logout">
            <button
              onClick={handleLogoutClick}
              className="nav-link logout-button"
            >
              <RiLogoutCircleLine className="me-2" />
              <span>Logout</span>
            </button>
          </li>
        </ul>

        {showLogoutConfirm && (
          <Modal
            show={showLogoutConfirm}
            onClose={handleCancelLogout}
            onConfirm={handleConfirmLogout}
          />
        )}
      </aside>
    </>
  );
}

export default SideBar;
