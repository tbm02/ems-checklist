import { useState, useEffect } from "react";
import { Calendar, FolderOpen, Bell, FileText } from "lucide-react";
import { dashboardService } from "../../services/apiService";

function EmployeeDashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await dashboardService.getEmployeeDashboard();
      setDashboardData(response.data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Dashboard</h1>
        <p className="mt-2 text-gray-600">Welcome to your personal workspace</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="bg-blue-500 p-3 rounded-md">
                  <FolderOpen className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    My Projects
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {dashboardData?.myProjects?.length || 0}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="bg-green-500 p-3 rounded-md">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Leave Balance
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {dashboardData?.leaveBalance || 0} days
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="bg-yellow-500 p-3 rounded-md">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Upcoming Leaves
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {dashboardData?.upcomingLeaves?.length || 0}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* My Projects */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            My Projects
          </h3>
          <div className="mt-5">
            {dashboardData?.myProjects?.length > 0 ? (
              <div className="space-y-3">
                {dashboardData.myProjects.slice(0, 3).map((project) => (
                  <div
                    key={project.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {project.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {project.description}
                      </p>
                    </div>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        project.status === "ACTIVE"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No projects assigned yet</p>
            )}
          </div>
        </div>
      </div>

      {/* Announcements */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Recent Announcements
          </h3>
          <div className="mt-5">
            {dashboardData?.announcements?.length > 0 ? (
              <div className="space-y-3">
                {dashboardData.announcements.slice(0, 3).map((announcement) => (
                  <div
                    key={announcement.id}
                    className="p-3 bg-blue-50 rounded-md"
                  >
                    <div className="flex items-start">
                      <Bell className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {announcement.title}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          {announcement.content}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No recent announcements</p>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Quick Actions
          </h3>
          <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="btn btn-primary">Apply for Leave</button>
            <button className="btn btn-secondary">View My Projects</button>
            <button className="btn btn-secondary">Update Profile</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeDashboard;
