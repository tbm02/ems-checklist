import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { userService } from "../../services/apiService";
import { Link } from "react-router-dom";

const EmployeeDashboard = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAssignments() {
      try {
        console.log("Fetching assignments...");
        const res = await userService.getMyAssignments();
        setAssignments(res.data || []);
      } catch (err) {
        toast.error("Failed to load assignments");
      } finally {
        setLoading(false);
      }
    }
    fetchAssignments();
  }, []);

  const formatDate = (date) => date ? new Date(date).toLocaleDateString() : "N/A";

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">My Workflows</h2>

      {loading ? (
        <p>Loading...</p>
      ) : assignments.length === 0 ? (
        <p className="text-gray-500">You don't have any assigned workflows yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {assignments.map((assignment) => (
            console.log(assignment),
            <div key={assignment.id} className="bg-white shadow rounded p-4">
              <h3 className="text-xl font-semibold mb-1">{assignment.workflowName}</h3>
              <p className="text-sm text-gray-500 mb-2">
                Assigned on: {formatDate(assignment.assignedDate)} | Priority: {assignment.priority}
              </p>
              <ul className="text-sm mb-3">
                {assignment.steps.map((step) => (
                  <li key={step.stepId}>
                    🔹 {step.stepName} - <strong>{step.status}</strong> (Due: {formatDate(step.dueDate)})
                  </li>
                ))}
              </ul>
              <Link to={`/workflow/${assignment.assignmentId}`} className="btn btn-primary">
                View & Update
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmployeeDashboard;
