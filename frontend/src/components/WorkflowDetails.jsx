import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { userService } from "../services/apiService";
import toast from "react-hot-toast";

const WorkflowDetails = () => {
  const { id } = useParams();
  const [workflow, setWorkflow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stepUpdates, setStepUpdates] = useState({});

  useEffect(() => {
    async function fetchWorkflowDetails() {
      try {
        const res = await userService.getAssignmentDetails(id);
        setWorkflow(res.data);
      } catch (err) {
        toast.error("Failed to load workflow details");
      } finally {
        setLoading(false);
      }
    }
    fetchWorkflowDetails();
  }, [id]);

  useEffect(() => {
    return () => {
      // Cleanup previews
      Object.values(stepUpdates).forEach((update) => {
        if (update?.previewUrl) {
          URL.revokeObjectURL(update.previewUrl);
        }
      });
    };
  }, [stepUpdates]);

  const formatDate = (date) =>
    date ? new Date(date).toLocaleDateString("en-GB") : "N/A";

  const handleChange = (stepId, field, value) => {
    setStepUpdates((prev) => ({
      ...prev,
      [stepId]: {
        ...prev[stepId],
        [field]: value,
      },
    }));
  };

  const handleFileChange = (stepId, file) => {
    const previewUrl = file ? URL.createObjectURL(file) : null;
    handleChange(stepId, "file", file);
    handleChange(stepId, "previewUrl", previewUrl);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    Object.entries(stepUpdates).forEach(([stepId, update]) => {
      formData.append(`stepUpdates[${stepId}][remarks]`, update.remarks || "");
      formData.append(`stepUpdates[${stepId}][status]`, "COMPLETED");
      if (update.file) {
        formData.append(`stepUpdates[${stepId}][file]`, update.file);
      }
    });

    try {
      await userService.updateWorkflow(id, formData);
      toast.success("Workflow updated successfully");
    } catch (err) {
      toast.error("Failed to update workflow");
    }
  };

  if (loading) return <div className="p-6 text-gray-600">Loading workflow...</div>;
  if (!workflow) return <div className="p-6 text-red-500">Workflow not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="mb-8 border-b pb-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{workflow.workflowName}</h1>
        <p className="text-gray-600 text-sm">
          <span className="font-semibold">Priority:</span> {workflow.priority || "N/A"} &nbsp; | &nbsp;
          <span className="font-semibold">Assigned At:</span> {formatDate(workflow.assignedDate)}
        </p>
      </div>

      <div className="space-y-6">
        {workflow.steps.map((step) => (
          <div key={step.stepId} className="bg-white p-5 rounded-lg shadow-sm border">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">{step.stepName}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">Status</label>
                <p className="text-sm text-gray-800 font-semibold">{step.status}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Due Date</label>
                <p className="text-sm text-gray-800">{formatDate(step.dueDate)}</p>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-600">Remarks</label>
                <input
                  type="text"
                  className="mt-1 block w-full border rounded px-3 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Add remarks"
                  onChange={(e) => handleChange(step.stepId, "remarks", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Attachment</label>
                <label className="mt-1 flex items-center gap-2 cursor-pointer text-blue-600 text-sm">
                  📎 Choose file
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => handleFileChange(step.stepId, e.target.files[0])}
                  />
                </label>

                {stepUpdates[step.stepId]?.previewUrl && (
                  <div className="mt-2 text-sm">
                    <span className="text-gray-500">Preview:</span>
                    <div className="border rounded mt-1 p-2 bg-gray-100">
                      {stepUpdates[step.stepId].file?.type.startsWith("image/") ? (
                        <img
                          src={stepUpdates[step.stepId].previewUrl}
                          alt="Preview"
                          className="w-32 h-auto rounded border"
                        />
                      ) : (
                        <a
                          href={stepUpdates[step.stepId].previewUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline"
                        >
                          View uploaded file
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2 mt-5">
                <input
                  type="checkbox"
                  className="w-5 h-5 text-blue-600"
                  onChange={(e) =>
                    handleChange(
                      step.stepId,
                      "status",
                      e.target.checked ? "COMPLETED" : step.status
                    )
                  }
                />
                <label className="text-sm text-gray-700">Mark as complete</label>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-right">
        <button
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md text-base font-medium"
        >
          ✅ Update Workflow
        </button>
      </div>
    </div>
  );
};

export default WorkflowDetails;
