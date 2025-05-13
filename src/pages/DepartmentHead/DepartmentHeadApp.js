import "bootstrap-icons/font/bootstrap-icons.css";
import "remixicon/fonts/remixicon.css";
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./DepartmentHeadApp.css";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Reports";
import Services from "./pages/Services";
import Staff from "./pages/Staff";
import Settings from "./pages/Settings";
import Transaction from "./pages/Transaction";
import RoleProtectedRoute from "../../middleware/RoleProtectedRoute";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <SideBar />

      <main className="flex-1 w-full max-w-[100rem] mx-auto">
        <Routes>
          <Route
            element={<RoleProtectedRoute allowedRoles={["departmentHead"]} />}
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/services" element={<Services />} />
            <Route path="/staff" element={<Staff />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/transaction" element={<Transaction />} />
          </Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
