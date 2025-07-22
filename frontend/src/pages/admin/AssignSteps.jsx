import React, { useEffect, useState } from "react";
import { userService, templateService } from "../../services/apiService";
import toast from "react-hot-toast";

function AssignSteps() {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [templateDetails, setTemplateDetails] = useState(null);
  const [users, setUsers] = useState([]);
  const [assignments, setAssignments] = useState({}); 
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchInitialData() {
      try {
        const [tplRes, userRes] = await Promise.all([
          templateService.getTemplates(),
          userService.getAllEmployees(),
        ]);
        setTemplates(tplRes.data || []);
        setUsers(userRes.data || []);
      } catch (err) {
        toast.error("Failed to load templates or users");
      }
    }

    fetchInitialData();
  }, []);

  const handleTemplateSelect = async (templateId) => {
    setSelectedTemplate(templateId);
    setLoading(true);
    try {
      const res = await templateService.getTemplate(templateId);
      setTemplateDetails(res.data);
      setAssignments({});
    } catch (err) {
      toast.error("Failed to load template details");
    } finally {
      setLoading(false);
    }
  };

  const handleAssignmentChange = (stepId, field, value) => {
    setAssignments((prev) => ({
      ...prev,
      [stepId]: {
        ...prev[stepId],
        [field]: value,
      },
    }));
  };

  const handleAssign = async () => {
    if (!templateDetails || !templateDetails.id) {
      toast.error("No template selected");
      return;
    }

    for (const step of templateDetails.steps || []) {
      if (!assignments[step.id]?.userId) {
        toast.error("Please assign all steps to users");
        return;
      }
    }

    const payload = {
      templateId: templateDetails.id,
      assignedToUserId: assignments[templateDetails.steps[0].id].userId, 
      stepAssignments: templateDetails.steps.map((step) => ({
        stepId: step.id,
        assignedTo: Number(assignments[step.id].userId),
        dueDate: assignments[step.id].dueDate || null,
      })),
    };

    try {
        setLoading(true);

        const token = localStorage.getItem("token"); 

        if (!token) {
          toast.error("User is not authenticated.");
          return;
        }

        await templateService.assignSteps(payload, token); 

        toast.success("Steps assigned successfully!");
        setSelectedTemplate(null);
        setTemplateDetails(null);
        setAssignments({});
      } catch (err) {
        toast.error("Failed to assign steps");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }


  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-8 mt-8">
      <h2 className="text-2xl font-bold mb-4">Assign Steps to Users</h2>

      <div className="mb-6">
        <label className="block font-medium mb-1">Select Template</label>
        <select
          className="input"
          value={selectedTemplate || ""}
          onChange={(e) => handleTemplateSelect(e.target.value)}
        >
          <option value="">-- Choose Template --</option>
          {templates.map((tpl) => (
            <option key={tpl.id} value={tpl.id}>
              {tpl.name}
            </option>
          ))}
        </select>
      </div>

      {loading && <div>Loading...</div>}

      {templateDetails?.steps?.length > 0 && !loading && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Steps</h3>
          <table className="min-w-full text-sm mb-4">
            <thead>
              <tr>
                <th className="py-2 px-4 text-left">Step</th>
                <th className="py-2 px-4 text-left">Assign to</th>
                <th className="py-2 px-4 text-left">Due Date</th>
              </tr>
            </thead>
            <tbody>
              {templateDetails.steps.map((step) => (
                <tr key={step.id}>
                  <td className="py-2 px-4">{step.stepName}</td>
                  <td className="py-2 px-4">
                    <select
                      className="input"
                      value={assignments[step.id]?.userId || ""}
                      onChange={(e) =>
                        handleAssignmentChange(step.id, "userId", e.target.value)
                      }
                    >
                      <option value="">-- Select User --</option>
                      {users.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.username} ({user.firstName} {user.lastName})
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="py-2 px-4">
                    <input
                      type="date"
                      className="input"
                      value={assignments[step.id]?.dueDate || ""}
                      onChange={(e) =>
                        handleAssignmentChange(step.id, "dueDate", e.target.value)
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            className="btn btn-primary"
            onClick={handleAssign}
            disabled={loading}
          >
            Assign Steps
          </button>
        </div>
      )}
    </div>
  );
}

export default AssignSteps;
