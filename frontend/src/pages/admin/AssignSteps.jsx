import React, { useEffect, useState } from "react";
import { userService, templateService } from "../../services/apiService";
import toast from "react-hot-toast";

function AssignSteps() {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [steps, setSteps] = useState([]);
  const [users, setUsers] = useState([]);
  const [assignments, setAssignments] = useState({}); // { stepId: { userId, dueDate } }
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch templates
    async function fetchTemplates() {
      try {
        const res = await templateService.getTemplates();
        setTemplates(res.data || []);
      } catch (err) {
        toast.error("Failed to load templates");
      }
    }
    // Fetch users
    async function fetchUsers() {
      try {
        const res = await userService.getAllEmployees();
        setUsers(res.data || []);
      } catch (err) {
        toast.error("Failed to load users");
      }
    }
    fetchTemplates();
    fetchUsers();
  }, []);

  const handleTemplateSelect = async (templateId) => {
    setSelectedTemplate(templateId);
    setLoading(true);
    try {
      const res = await templateService.getTemplate(templateId);
      setSteps(res.data.steps || []);
      setAssignments({});
    } catch (err) {
      toast.error("Failed to load template steps");
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
    // Validate
    for (const step of steps) {
      if (!assignments[step.id] || !assignments[step.id].userId) {
        toast.error("Assign all steps to users");
        return;
      }
    }
    try {
      setLoading(true);
      // Call API to assign steps
      await templateService.assignSteps(selectedTemplate, steps.map((step) => ({
        stepId: step.id,
        userId: assignments[step.id].userId,
        dueDate: assignments[step.id].dueDate || null,
      })));
      toast.success("Steps assigned successfully");
      setSelectedTemplate(null);
      setSteps([]);
      setAssignments({});
    } catch (err) {
      toast.error("Failed to assign steps");
    } finally {
      setLoading(false);
    }
  };

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
          <option value="">Select a template</option>
          {templates.map((tpl) => (
            <option key={tpl.id} value={tpl.id}>{tpl.title}</option>
          ))}
        </select>
      </div>
      {loading && <div>Loading...</div>}
      {steps.length > 0 && !loading && (
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
              {steps.map((step) => (
                <tr key={step.id}>
                  <td className="py-2 px-4">{step.name}</td>
                  <td className="py-2 px-4">
                    <select
                      className="input"
                      value={assignments[step.id]?.userId || ""}
                      onChange={(e) => handleAssignmentChange(step.id, "userId", e.target.value)}
                    >
                      <option value="">Select user</option>
                      {users.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.username} ({user.firstName} {user.lastName})
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="py-2 px-4">
                    <input
                      className="input"
                      type="date"
                      value={assignments[step.id]?.dueDate || ""}
                      onChange={(e) => handleAssignmentChange(step.id, "dueDate", e.target.value)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="btn btn-primary" onClick={handleAssign} disabled={loading}>
            Assign Steps
          </button>
        </div>
      )}
    </div>
  );
}

export default AssignSteps; 