import { useState } from "react";
import toast from "react-hot-toast";
import { userService } from "../services/apiService";

function CreateEmployeeModal({ onClose }) {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    await userService.registerUser(form);
      toast.success("Employee created successfully");
      onClose(); 
    } catch (err) {
      toast.error("Failed to create employee");
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Create New Employee</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input name="username" placeholder="Username" onChange={handleChange} required className="input" />
          <input name="email" placeholder="Email" type="email" onChange={handleChange} required className="input" />
          <input name="password" placeholder="Password" type="password" onChange={handleChange} required className="input" />
          <input name="firstName" placeholder="First Name" onChange={handleChange} required className="input" />
          <input name="lastName" placeholder="Last Name" onChange={handleChange} required className="input" />
          <input name="phoneNumber" placeholder="Phone Number" onChange={handleChange} className="input" />
          <div className="flex justify-end space-x-2 pt-2">
            <button type="button" onClick={onClose} className="btn btn-secondary">Cancel</button>
            <button type="submit" className="btn btn-primary">Create</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateEmployeeModal;
