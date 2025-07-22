import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { templateService } from "../../services/apiService";
import toast from "react-hot-toast";

const WorkflowReport = () => {
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReport() {
      try {
        const res = await templateService.getWorkflowReport(id);
        setReport(res.data);
      } catch (err) {
        toast.error("Failed to load report");
      } finally {
        setLoading(false);
      }
    }

    fetchReport();
  }, [id]);

  const getStatusColor = (status) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-100 text-green-700";
      case "PENDING":
        return "bg-yellow-100 text-yellow-700";
      case "OVERDUE":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (!report) return <div className="p-6 text-red-500">Report not available</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Workflow Report</h2>

      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Workflow Name</p>
            <p className="text-lg font-medium text-gray-800">{report.workflowName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Priority</p>
            <span className="inline-block bg-purple-100 text-purple-800 text-sm px-3 py-1 rounded-full">
              {report.priority}
            </span>
          </div>
          <div>
            <p className="text-sm text-gray-500">Assigned To</p>
            <p className="text-lg font-medium text-gray-800">{report.assignedTo}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Assigned Date</p>
            <p className="text-lg font-medium text-gray-800">{report.assignedDate}</p>
          </div>
        </div>
      </div>

      <h3 className="text-2xl font-semibold text-gray-800 mb-4">Steps Detail</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border shadow-sm rounded">
          <thead className="bg-gray-50 text-gray-600 text-sm uppercase">
            <tr>
              <th className="px-6 py-3 text-left">Step</th>
              <th className="px-6 py-3 text-left">Assigned To</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Due Date</th>
              <th className="px-6 py-3 text-left">Completed At</th>
              <th className="px-6 py-3 text-left">Remarks</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700">
            {report.steps.map((step, idx) => (
              <tr
                key={idx}
                className="border-t hover:bg-gray-50 transition duration-150"
              >
                <td className="px-6 py-4">{step.stepName}</td>
                <td className="px-6 py-4">{step.assignedTo}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(step.status)}`}>
                    {step.status}
                  </span>
                </td>
                <td className="px-6 py-4">{step.dueDate || "N/A"}</td>
                <td className="px-6 py-4">{step.completedAt || "N/A"}</td>
                <td className="px-6 py-4">{step.remarks || "-"}</td>
              </tr>
            ))}
            {report.steps.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-400">
                  No steps found for this workflow.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WorkflowReport;
