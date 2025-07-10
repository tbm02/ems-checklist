import { useEffect, useState } from "react";
import { userService } from "../../services/apiService";
import toast from "react-hot-toast";

function Profile() {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });

  const [passwordChange, setPasswordChange] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await userService.getProfile();
      setUserData({
        firstName: response.data.firstName || "",
        lastName: response.data.lastName || "",
        phoneNumber: response.data.phoneNumber || "",
      });
    } catch {
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) =>
    setUserData({ ...userData, [e.target.name]: e.target.value });

  const handlePasswordChange = (e) =>
    setPasswordChange({ ...passwordChange, [e.target.name]: e.target.value });

  const handleSave = async () => {
    try {
      await userService.updateProfile(userData);
      toast.success("Profile updated successfully");
    } catch {
      toast.error("Failed to update profile");
    }
  };

  const handlePasswordSubmit = async () => {
    if (passwordChange.newPassword !== passwordChange.confirmNewPassword) {
      toast.error("New passwords do not match");
      return;
    }

    try {
      await userService.changePassword(passwordChange);
      toast.success("Password changed successfully");
      setPasswordChange({
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
    } catch {
      toast.error("Failed to change password");
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="space-y-10 max-w-4xl mx-auto px-4 py-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
        <p className="text-gray-500 mt-1">Manage your personal information</p>
      </div>

      {/* Profile Info */}
      <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
        <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
          Personal Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={userData.firstName}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
              placeholder="Enter first name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={userData.lastName}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
              placeholder="Enter last name"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="text"
              name="phoneNumber"
              value={userData.phoneNumber}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
              placeholder="Enter phone number"
            />
          </div>
        </div>

        <div className="pt-4">
          <button
            onClick={handleSave}
            className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded shadow"
          >
            Save Changes
          </button>
        </div>
      </div>

      {/* Password Change */}
      <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
        <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
          Change Password
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Old Password
            </label>
            <input
              type="password"
              name="oldPassword"
              value={passwordChange.oldPassword}
              onChange={handlePasswordChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
              placeholder="Enter old password"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              value={passwordChange.newPassword}
              onChange={handlePasswordChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
              placeholder="Enter new password"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Confirm New Password
            </label>
            <input
              type="password"
              name="confirmNewPassword"
              value={passwordChange.confirmNewPassword}
              onChange={handlePasswordChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
              placeholder="Re-enter new password"
            />
          </div>
        </div>

        <div className="pt-4">
          <button
            onClick={handlePasswordSubmit}
            className="bg-gray-700 hover:bg-gray-800 text-white font-medium py-2 px-4 rounded shadow"
          >
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
