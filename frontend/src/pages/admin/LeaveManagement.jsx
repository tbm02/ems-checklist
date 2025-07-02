import React from "react";

function LeaveManagement() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Leave Management</h1>
        <p className="mt-2 text-gray-600">Manage employee leave requests</p>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <p className="text-gray-500">
          Leave management functionality will be implemented here.
        </p>
        <p className="text-sm text-gray-400 mt-2">
          Features: View all leave requests, approve/reject leaves, leave
          analytics
        </p>
      </div>
    </div>
  );
}

export default LeaveManagement;
