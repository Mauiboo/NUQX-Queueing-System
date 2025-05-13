import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ForbiddenPage from "./pages/ForbiddenPage.jsx";
import Login from "./pages/Login.jsx";
import HomePage from "./pages/HomePage.jsx";
import StaffApp from "./pages/Staff/StaffApp.js";
import KioskApp from "./pages/KIOSK/src/KioskApp";
import StartPage from "./pages/KIOSK/src/Pages/StartPage";
import MainPage from "./pages/KIOSK/src/Pages/MainPage";
import Step1Guide from "./pages/KIOSK/src/Pages/Step1Guide";
import Step2Guide from "./pages/KIOSK/src/Pages/Step2Guide";
import Step3Guide from "./pages/KIOSK/src/Pages/Step3Guide";
import Step4Guide from "./pages/KIOSK/src/Pages/Step4Guide";
import DepartmentHeadApp from "./pages/DepartmentHead/DepartmentHeadApp";
import MonitorDisplay from "./pages/MonitorDisplay/src/MonitorDisplay";
import AddDeptHead from "./pages/Hardcoded Users/AddDeptHead.jsx";
import AddMonitorDisplay from "./pages/Hardcoded Users/AddMonitorDisplay.jsx";
import AddKioskUser from "./pages/Hardcoded Users/AddKioskUser.jsx";
import RoleProtectedRoute from "./middleware/RoleProtectedRoute.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/403" element={<ForbiddenPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/staff/*" element={<StaffApp />} />

        <Route element={<RoleProtectedRoute allowedRoles={["kiosk"]} />}>
          <Route path="/help/1" element={<Step1Guide />} />
          <Route path="/help/2" element={<Step2Guide />} />
          <Route path="/help/3" element={<Step3Guide />} />
          <Route path="/help/4" element={<Step4Guide />} />
          <Route path="/kiosk/*" element={<KioskApp />} />
          <Route path="/startpage/*" element={<StartPage />} />
          <Route path="/mainpage" element={<MainPage />} />
        </Route>

        <Route path="/departmenthead/*" element={<DepartmentHeadApp />} />
        <Route element={<RoleProtectedRoute allowedRoles={["display"]} />}>
          <Route path="/monitordisplay/*" element={<MonitorDisplay />} />
        </Route>

        {/* for hard coding users */}
        <Route path="/add-dept-head" element={<AddDeptHead />} />
        <Route path="/add-kiosk" element={<AddKioskUser />} />
        <Route path="/add-display" element={<AddMonitorDisplay />} />
      </Routes>
    </Router>
  );
}

export default App;
