import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { templateService } from "../services/apiService";
import toast from "react-hot-toast";
import "chart.js/auto";
import { useNavigate } from "react-router-dom";

const AdminWorkflowDashboard = () => {
  const navigate = useNavigate();
  const [workflows, setWorkflows] = useState([]);
  const [filteredWorkflows, setFilteredWorkflows] = useState([]);
  const [filter, setFilter] = useState("All");

  const getStatusCounts = () => {
    const total = workflows.length;
    const completed = workflows.filter((w) => w.status === "completed").length;
    const pending = workflows.filter((w) => w.status === "pending").length;
    const overdue = workflows.filter((w) => w.status === "overdue").length;
    return { total, completed, pending, overdue };
  };

  const { total, completed, pending, overdue } = getStatusCounts();

  useEffect(() => {
    async function fetchWorkflows() {
      try {
        const res = await templateService.getAllWorkflowStatuses(); 
        setWorkflows(res.data.workflows || []);
        setFilteredWorkflows(res.data.workflows || []);
      } catch (err) {
        toast.error("Failed to load workflows");
      }
    }
    fetchWorkflows();
  }, []);

  useEffect(() => {
    if (filter === "All") {
      setFilteredWorkflows(workflows);
    } else {
      setFilteredWorkflows(
        workflows.filter((w) => w.status === filter.toLowerCase())
      );
    }
  }, [filter, workflows]);

  const chartData = {
    labels: ["Completed", "Pending", "Overdue"],
    datasets: [
      {
        data: [completed, pending, overdue],
        backgroundColor: ["#22c55e", "#3b82f6", "#ef4444"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">CheckMate - Workflow Overview</h2>

      {/* Overview Section */}
      <div className="bg-gray-100 p-6 rounded-md shadow mb-8 flex flex-col md:flex-row justify-between items-center">
        <div className="grid grid-cols-4 gap-6 flex-1">
          <div>
            <p className="text-sm text-gray-500">Total Workflows</p>
            <p className="text-3xl font-bold">{total}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Completed</p>
            <p className="text-3xl font-bold text-green-600">{completed}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Pending</p>
            <p className="text-3xl font-bold text-blue-600">{pending}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Overdue</p>
            <p className="text-3xl font-bold text-red-500">{overdue}</p>
          </div>
        </div>
        <div className="w-48 h-48 mt-6 md:mt-0">
          <Pie data={chartData} />
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="mb-4 flex gap-4">
        {["All", "Completed", "Pending", "Overdue"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`btn ${filter === status ? "btn-primary" : "btn-outline"}`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-3 px-4">Serial No.</th>
              <th className="py-3 px-4">Workflow Name</th>
              <th className="py-3 px-4">Priority</th>
              <th className="py-3 px-4">Tasks Completed</th>
              <th className="py-3 px-4">Due Date</th>
              <th className="py-3 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredWorkflows.map((wf, index) => (
              <tr key={wf.id} className="border-t">
                <td className="py-3 px-4">{index + 1}</td>
                <td className="py-3 px-4">{wf.workflowName}</td>
                <td className="py-3 px-4 capitalize">{wf.priority.toLowerCase()}</td>
                <td className="py-3 px-4">
                  {wf.completedSteps}/{wf.totalSteps}
                </td>
                <td className="py-3 px-4">{wf.dueDate || "N/A"}</td>
                <td className="py-3 px-4">
                  <button
                    className="btn btn-secondary"
                    onClick={() => navigate(`/admin/workflows/report/${wf.id}`)}
                  >
                    View Report
                  </button>

                </td>
              </tr>
            ))}
            {filteredWorkflows.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-500">
                  No workflows found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminWorkflowDashboard;
