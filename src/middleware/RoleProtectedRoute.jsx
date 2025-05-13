import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const RoleProtectedRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/login" />;

  try {
    const decoded = jwtDecode(token);
    if (allowedRoles.includes(decoded.role)) {
      return <Outlet />;
    } else {
      return <Navigate to="/403" />;
    }
  } catch (err) {
    return <Navigate to="/login" />;
  }
};

export default RoleProtectedRoute;
