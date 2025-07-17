import { useState, useEffect } from "react";
import { Users, FolderOpen, Calendar, Clock } from "lucide-react";
import { dashboardService } from "../../services/apiService";
import CreateEmployeeModal from "../../components/CreateEmployeeModal";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false); 
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await dashboardService.getAdminDashboard();
      setDashboardData(response.data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEmployeeCreated = () => {
    setShowModal(false);
    fetchDashboardData(); // refresh dashboard after new employee added
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const stats = [
    {
      name: "Total Employees",
      value: dashboardData?.totalEmployees || 0,
      icon: Users,
      color: "bg-blue-500",
    },
    {
      name: "Active Projects",
      value: dashboardData?.activeProjects || 0,
      icon: FolderOpen,
      color: "bg-green-500",
    },
    {
      name: "Leave Requests This Month",
      value: dashboardData?.leaveRequestsThisMonth || 0,
      icon: Calendar,
      color: "bg-yellow-500",
    },
    {
      name: "Pending Leaves",
      value: dashboardData?.pendingLeaves?.length || 0,
      icon: Clock,
      color: "bg-red-500",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="mt-2 text-gray-600">Overview of your organization</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="bg-white overflow-hidden shadow rounded-lg"
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className={`${stat.color} p-3 rounded-md`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {stat.name}
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {stat.value}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Leave Requests */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Recent Leave Requests
          </h3>
          <div className="mt-5">
            {dashboardData?.pendingLeaves?.length > 0 ? (
              <div className="space-y-3">
                {dashboardData.pendingLeaves.slice(0, 5).map((leave) => (
                  <div
                    key={leave.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {leave.employee?.firstName} {leave.employee?.lastName}
                      </p>
                      <p className="text-sm text-gray-500">
                        {leave.leaveType} - {leave.startDate} to {leave.endDate}
                      </p>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Pending
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No pending leave requests</p>
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
            <button className="btn btn-primary" onClick={() => setShowModal(true)}>
              Create New Employee
            </button>
            <button className="btn btn-secondary" onClick={()=>navigate("/admin/create-template")}>Create Workflow</button>
            <button className="btn btn-secondary" onClick={()=>navigate("/admin/assign-steps")}>Initialise Workflow</button>
          </div>
        </div>
      </div>

      {/* Modal Mount */}
      {showModal && (
        <CreateEmployeeModal
          onClose={() => setShowModal(false)}
          onSuccess={handleEmployeeCreated}
        />
      )}
    </div>
  );
}

export default AdminDashboard;
