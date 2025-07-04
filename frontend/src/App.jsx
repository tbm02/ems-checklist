import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import Layout from "./components/Layout";
import Login from "./pages/auth/Login";
import AdminDashboard from "./pages/admin/AdminDashboard";
import EmployeeDashboard from "./pages/employee/EmployeeDashboard";
import LeaveManagement from "./pages/admin/LeaveManagement";
import EmployeeManagement from "./pages/admin/EmployeeManagement";
import MyLeaves from "./pages/employee/MyLeaves";
import MyProjects from "./pages/employee/MyProjects";
import Policies from "./pages/employee/Policies";
import Profile from "./pages/employee/Profile";
import LoadingSpinner from "./components/LoadingSpinner";

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={
          !user ? <Login /> : <Navigate to={getDefaultRoute(user.role)} />
        }
      />

      {user ? (
        <Route path="/" element={<Layout />}>
          {user.role === "ADMIN" ? (
            <>
              <Route index element={<Navigate to="/admin/dashboard" />} />
              <Route path="admin/dashboard" element={<AdminDashboard />} />
              <Route path="admin/leaves" element={<LeaveManagement />} />
              <Route path="admin/employees" element={<EmployeeManagement />} />
              <Route path="profile" element={<Profile />} />
            </>
          ) : (
            <>
              <Route index element={<Navigate to="/employee/dashboard" />} />
              <Route
                path="employee/dashboard"
                element={<EmployeeDashboard />}
              />
              <Route path="employee/leaves" element={<MyLeaves />} />
              <Route path="employee/projects" element={<MyProjects />} />
              <Route path="employee/policies" element={<Policies />} />
              <Route path="profile" element={<Profile />} />
            </>
          )}
        </Route>
      ) : (
        <Route path="*" element={<Navigate to="/login" />} />
      )}
    </Routes>
  );
}

function getDefaultRoute(role) {
  return role === "ADMIN" ? "/admin/dashboard" : "/employee/dashboard";
}

export default App;
