import React from "react";

function Profile() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
        <p className="mt-2 text-gray-600">Manage your personal information</p>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <p className="text-gray-500">
          Profile management functionality will be implemented here.
        </p>
        <p className="text-sm text-gray-400 mt-2">
          Features: Edit personal details, upload profile picture, change
          password
        </p>
      </div>
    </div>
  );
}

export default Profile;
