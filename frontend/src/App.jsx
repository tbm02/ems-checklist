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
import CreateTemplate from "./pages/admin/CreateTemplate";
import AssignSteps from "./pages/admin/AssignSteps";
import WorkflowOverview from "./components/WorkflowOverview";

function App() {
  const { user, loading } = useAuth();
  console.log(user)

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={
          !user ? (
            <Login />
          ) : (
            <Navigate
              to={
                user.role === "ADMIN"
                  ? "/admin/dashboard"
                  : user.firstLogin
                  ? "/profile"
                  : "/employee/dashboard"
              }
            />
          )
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
              <Route path="admin/create-template" element={<CreateTemplate />} />
              <Route path="admin/assign-steps" element={<AssignSteps />} />
              <Route path="admin/workflowoverview" element={<WorkflowOverview />} />

            </>
          ) : (
            <>
             <Route
                      index
                      element={
                        user.firstLogin ? (
                          <Navigate to="/profile" />
                        ) : (
                          <Navigate to="/employee/dashboard" />
                        )
                      }
                    />
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
