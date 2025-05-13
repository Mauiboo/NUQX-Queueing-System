import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./sideBar.css";
import {
  RiBarChartFill,
  RiFileListLine,
  RiDashboardLine,
  RiTeamLine,
  RiSettings4Line,
  RiLogoutCircleLine,
  RiStackLine,
} from "react-icons/ri";
import Modal from "./Modal";

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
        <ul className="sidebar-nav-dep" id="sidebar-nav">
          <li
            className={`nav-item ${getActiveClass(
              "/departmenthead/dashboard"
            )}`}
          >
            <Link
              to="/departmenthead/dashboard"
              className="nav-link"
              onClick={closeSidebar}
            >
              <RiDashboardLine className="me-2" />
              <span>Dashboard</span>
            </Link>
          </li>

          <li
            className={`nav-item ${getActiveClass("/departmenthead/reports")}`}
          >
            <Link
              to="/departmenthead/reports"
              className="nav-link"
              onClick={closeSidebar}
            >
              <RiBarChartFill className="me-2" />
              <span>Reports</span>
            </Link>
          </li>

          <li
            className={`nav-item ${getActiveClass(
              "/departmenthead/transaction"
            )}`}
          >
            <Link
              to="/departmenthead/transaction"
              className="nav-link"
              onClick={closeSidebar}
            >
              <RiFileListLine className="me-2" />
              <span>Transactions</span>
            </Link>
          </li>

          <li
            className={`nav-item ${getActiveClass("/departmenthead/services")}`}
          >
            <Link
              to="/departmenthead/services"
              className="nav-link"
              onClick={closeSidebar}
            >
              <RiStackLine className="me-2" />
              <span>Services</span>
            </Link>
          </li>

          <li className={`nav-item ${getActiveClass("/departmenthead/staff")}`}>
            <Link
              to="/departmenthead/staff"
              className="nav-link"
              onClick={closeSidebar}
            >
              <RiTeamLine className="me-2" />
              <span>Staff</span>
            </Link>
          </li>

          <li
            className={`nav-item ${getActiveClass("/departmenthead/settings")}`}
          >
            <Link
              to="/departmenthead/settings"
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
