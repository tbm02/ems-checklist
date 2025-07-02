import React from 'react'

function MyProjects() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Projects</h1>
        <p className="mt-2 text-gray-600">View your assigned projects and timeline</p>
      </div>
      
      <div className="bg-white shadow rounded-lg p-6">
        <p className="text-gray-500">Project overview functionality will be implemented here.</p>
        <p className="text-sm text-gray-400 mt-2">
          Features: Project timeline, Gantt chart, project details, team members
        </p>
      </div>
    </div>
  )
}

export default MyProjects 