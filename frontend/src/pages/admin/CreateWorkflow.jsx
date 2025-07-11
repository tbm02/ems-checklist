import React, { useState, useEffect } from "react";
import { userService } from "../../services/apiService";
import toast from "react-hot-toast";

const PRIORITIES = [
  { label: "high", value: "HIGH" },
  { label: "medium", value: "MEDIUM" },
  { label: "low", value: "LOW" },
];

function CreateWorkFLow() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("MEDIUM");
  const [tasks, setTasks] = useState([]);
  const [isDraft, setIsDraft] = useState(false);

  const [taskForm, setTaskForm] = useState({
    name: "",
    description: "",
    dueDate: "",
    assignedTo: "",
    sequence: 1,
  });

  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [showTaskForm, setShowTaskForm] = useState(false); // 🔄 toggles right-side form

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await userService.getAllEmployees();
        setUsers(res.data || []);
      } catch (err) {
        toast.error("Failed to load users");
      } finally {
        setLoadingUsers(false);
      }
    }
    fetchUsers();
  }, []);

  const handleAddTask = () => {
    if (!taskForm.name || !taskForm.description || !taskForm.dueDate || !taskForm.assignedTo) {
      toast.error("Please fill all task fields");
      return;
    }

    setTasks([...tasks, { ...taskForm, id: Date.now() }]);

    setTaskForm({
      name: "",
      description: "",
      dueDate: "",
      assignedTo: "",
      sequence: tasks.length + 2,
    });

    setShowTaskForm(false); // ✅ Hide after adding
  };

  const handleRemoveTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const handleTaskFormChange = (e) => {
    const { name, value } = e.target;
    setTaskForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleWorkflowSubmit = (e, draft = false) => {
    e.preventDefault();
    if (!title || !description || tasks.length === 0) {
      toast.error("Please fill all workflow fields and add at least one task");
      return;
    }

    setIsDraft(draft);
    toast.success(draft ? "Workflow saved as draft" : "Workflow created!");
    console.log({
      title,
      description,
      priority,
      tasks,
      status: draft ? "DRAFT" : "PUBLISHED",
    });

    setTitle("");
    setDescription("");
    setPriority("MEDIUM");
    setTasks([]);
    setTaskForm({ name: "", description: "", dueDate: "", assignedTo: "", sequence: 1 });
  };

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-lg shadow p-8 mt-8 flex flex-col md:flex-row gap-8">
      {/* Left: Workflow Form */}
      <div className="flex-1">
        <h2 className="text-2xl font-bold mb-4">New Workflow</h2>
        <form onSubmit={handleWorkflowSubmit}>
          <div className="mb-4">
            <label className="block font-medium mb-1">Title</label>
            <input
              className="input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter workflow title"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1">Description</label>
            <textarea
              className="input min-h-[80px]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter workflow description"
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
            <label className="block font-medium mb-1">Tasks:</label>
            <ul className="mb-2 space-y-2">
              {tasks.map((task, idx) => (
                <li key={task.id} className="flex items-center gap-2 bg-gray-50 rounded p-2">
                  <span className="font-semibold">Task {idx + 1}:</span>
                  <span className="truncate max-w-xs">
                    {task.name}, {task.description}, {task.dueDate}, Assigned to:{" "}
                    {users.find((u) => u.id == task.assignedTo)?.username || task.assignedTo}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTask(task.id)}
                    className="ml-auto text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => setShowTaskForm(true)} // ✅ Show right form
              className="btn btn-secondary mt-2"
            >
              Add Task +
            </button>
          </div>
          <div className="flex gap-4 mt-6">
            <button type="submit" className="btn btn-primary">Create</button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={(e) => handleWorkflowSubmit(e, true)}
            >
              Save as Draft
            </button>
          </div>
        </form>
      </div>

      {/* Right: Task Form */}
      {showTaskForm && (
        <div className="flex-1 border rounded-lg p-6 bg-gray-50">
          <h3 className="text-lg font-bold mb-4">Add Task</h3>
          <div className="mb-3">
            <label className="block font-medium mb-1">Name of Task</label>
            <input
              className="input"
              name="name"
              value={taskForm.name}
              onChange={handleTaskFormChange}
              placeholder="Task name"
            />
          </div>
          <div className="mb-3">
            <label className="block font-medium mb-1">Description</label>
            <textarea
              className="input min-h-[60px]"
              name="description"
              value={taskForm.description}
              onChange={handleTaskFormChange}
              placeholder="Task description"
            />
          </div>
          <div className="mb-3">
            <label className="block font-medium mb-1">Due Date</label>
            <input
              className="input"
              type="date"
              name="dueDate"
              value={taskForm.dueDate}
              onChange={handleTaskFormChange}
            />
          </div>
          <div className="mb-3">
            <label className="block font-medium mb-1">Assign to</label>
            <select
              className="input"
              name="assignedTo"
              value={taskForm.assignedTo}
              onChange={handleTaskFormChange}
              disabled={loadingUsers}
            >
              <option value="">Select user</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.username} ({user.firstName} {user.lastName})
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="block font-medium mb-1">Sequence</label>
            <input
              className="input"
              name="sequence"
              type="number"
              min={1}
              value={taskForm.sequence}
              onChange={handleTaskFormChange}
            />
          </div>
          <div className="flex gap-4 mt-4">
            <button type="button" className="btn btn-primary" onClick={handleAddTask}>
              Add Task
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setShowTaskForm(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateWorkFLow;
