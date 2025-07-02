import React from "react";

function Policies() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Company Policies</h1>
        <p className="mt-2 text-gray-600">
          View company policies and guidelines
        </p>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <p className="text-gray-500">
          Company policies will be displayed here.
        </p>
        <p className="text-sm text-gray-400 mt-2">
          Features: Policy list, search policies, policy details, effective
          dates
        </p>
      </div>
    </div>
  );
}

export default Policies;
