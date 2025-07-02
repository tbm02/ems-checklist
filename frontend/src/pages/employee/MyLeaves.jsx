import React from "react";

function MyLeaves() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Leaves</h1>
        <p className="mt-2 text-gray-600">
          Apply for leave and view your leave history
        </p>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <p className="text-gray-500">
          Leave application functionality will be implemented here.
        </p>
        <p className="text-sm text-gray-400 mt-2">
          Features: Apply for leave, view leave history, check leave balance
        </p>
      </div>
    </div>
  );
}

export default MyLeaves;
