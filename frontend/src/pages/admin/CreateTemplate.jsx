import React, { useState } from "react";
import toast from "react-hot-toast";

function CreateTemplate() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("MEDIUM");
  const [steps, setSteps] = useState([]);
  const [stepForm, setStepForm] = useState({
    name: "",
    description: "",
    sequence: steps.length + 1,
  });
  const [showStepForm, setShowStepForm] = useState(false);

  const PRIORITIES = [
    { label: "high", value: "HIGH" },
    { label: "medium", value: "MEDIUM" },
    { label: "low", value: "LOW" },
  ];

  const handleAddStep = () => {
    if (!stepForm.name || !stepForm.description) {
      toast.error("Please fill all step fields");
      return;
    }
    setSteps([...steps, { ...stepForm, id: Date.now() }]);
    setStepForm({ name: "", description: "", sequence: steps.length + 2 });
    setShowStepForm(false);
  };

  const handleRemoveStep = (id) => {
    setSteps(steps.filter((s) => s.id !== id));
  };

  const handleStepFormChange = (e) => {
    const { name, value } = e.target;
    setStepForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleTemplateSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || steps.length === 0) {
      toast.error("Please fill all template fields and add at least one step");
      return;
    }
    // TODO: Call API to create template
    toast.success("Template created!");
    setTitle("");
    setDescription("");
    setPriority("MEDIUM");
    setSteps([]);
    setStepForm({ name: "", description: "", sequence: 1 });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-8 mt-8 flex flex-col md:flex-row gap-8">
      {/* Left: Template Form */}
      <div className="flex-1">
        <h2 className="text-2xl font-bold mb-4">New Workflow Template</h2>
        <form onSubmit={handleTemplateSubmit}>
          <div className="mb-4">
            <label className="block font-medium mb-1">Title</label>
            <input
              className="input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter template title"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1">Description</label>
            <textarea
              className="input min-h-[80px]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter template description"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1">Select Priority:</label>
            <div className="flex gap-6 mt-1">
              {PRIORITIES.map((p) => (
                <label key={p.value} className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="radio"
                    name="priority"
                    value={p.value}
                    checked={priority === p.value}
                    onChange={() => setPriority(p.value)}
                    className="accent-primary-600"
                  />
                  <span className="capitalize">{p.label}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1">Steps:</label>
            <ul className="mb-2 space-y-2">
              {steps.map((step, idx) => (
                <li key={step.id} className="flex items-center gap-2 bg-gray-50 rounded p-2">
                  <span className="font-semibold">Step {idx + 1}:</span>
                  <span className="truncate max-w-xs">
                    {step.name}, {step.description}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveStep(step.id)}
                    className="ml-auto text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => setShowStepForm(true)}
              className="btn btn-secondary mt-2"
            >
              Add Step +
            </button>
          </div>
          <div className="flex gap-4 mt-6">
            <button type="submit" className="btn btn-primary">Create Template</button>
          </div>
        </form>
      </div>
      {/* Right: Step Form */}
      {showStepForm && (
        <div className="flex-1 border rounded-lg p-6 bg-gray-50">
          <h3 className="text-lg font-bold mb-4">Add Step</h3>
          <div className="mb-3">
            <label className="block font-medium mb-1">Name of Step</label>
            <input
              className="input"
              name="name"
              value={stepForm.name}
              onChange={handleStepFormChange}
              placeholder="Step name"
            />
          </div>
          <div className="mb-3">
            <label className="block font-medium mb-1">Description</label>
            <textarea
              className="input min-h-[60px]"
              name="description"
              value={stepForm.description}
              onChange={handleStepFormChange}
              placeholder="Step description"
            />
          </div>
          <div className="mb-3">
            <label className="block font-medium mb-1">Sequence</label>
            <input
              className="input"
              name="sequence"
              type="number"
              min={1}
              value={stepForm.sequence}
              onChange={handleStepFormChange}
            />
          </div>
          <div className="flex gap-4 mt-4">
            <button type="button" className="btn btn-primary" onClick={handleAddStep}>
              Add Step
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setShowStepForm(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateTemplate;
