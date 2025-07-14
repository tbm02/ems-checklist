import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  LayoutDashboard,
  Calendar,
  Users,
  FileText,
  FolderOpen,
  User,
  LogOut,
  Check,
} from "lucide-react";

function Sidebar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const adminNavItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Leave Management", href: "/admin/leaves", icon: Calendar },
    { name: "Employee Management", href: "/admin/employees", icon: Users },
    // { name: "Profile", href: "/profile", icon: User },
    { name: "Check Status", href:"admin/workflowoverview", icon: Check },
  ];

  const employeeNavItems = [
    { name: "Dashboard", href: "/employee/dashboard", icon: LayoutDashboard },
    { name: "My Leaves", href: "/employee/leaves", icon: Calendar },
    { name: "My Projects", href: "/employee/projects", icon: FolderOpen },
    { name: "Policies", href: "/employee/policies", icon: FileText },
    { name: "Profile", href: "/profile", icon: User },
  ];

  const navItems = user?.role === "ADMIN" ? adminNavItems : employeeNavItems;

  const isActive = (href) => location.pathname === href;

  return (
    <div className="bg-gray-800 text-white w-64 min-h-screen flex flex-col">
      <div className="p-4">
        <h1 className="text-xl font-bold">EMS</h1>
        <p className="text-sm text-gray-300">Employee Management</p>
      </div>

      <nav className="flex-1 px-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? "bg-primary-600 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-700">
        <button
          onClick={logout}
          className="flex items-center w-full px-4 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white transition-colors"
        >
          <LogOut className="mr-3 h-5 w-5" />
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
