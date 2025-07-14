import React, { useState } from 'react';

const workflowsData = [
  { id: 1, name: 'abc', priority: 'high', tasksPending: '2/8', dueDate: '12/06/2024', status: 'pending' },
  { id: 2, name: 'def', priority: 'medium', tasksPending: '1/5', dueDate: '15/06/2024', status: 'completed' },
  { id: 3, name: 'ghi', priority: 'medium', tasksPending: '3/8', dueDate: '18/06/2024', status: 'pending' },
  { id: 4, name: 'jkl', priority: 'low', tasksPending: '2/7', dueDate: '20/06/2024', status: 'overdue' },
];

const summary = {
  total: 15,
  completed: 7,
  pending: 8,
  overdue: 1,
};

const filters = [
  { label: 'All', value: 'all' },
  { label: 'completed', value: 'completed' },
  { label: 'pending', value: 'pending' },
  { label: 'overdue', value: 'overdue' },
];

const getStatusColor = (status) => {
  switch (status) {
    case 'completed':
      return 'text-green-600';
    case 'pending':
      return 'text-blue-600';
    case 'overdue':
      return 'text-red-600';
    default:
      return '';
  }
};

export default function WorkflowOverview() {
  const [filter, setFilter] = useState('all');

  const filteredWorkflows =
    filter === 'all'
      ? workflowsData
      : workflowsData.filter((w) => w.status === filter);

  return (
    <div className="p-6 w-full min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow p-6 flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div className="flex-1">
          <div className="text-lg font-medium mb-2">workflow overview</div>
          <div className="flex flex-wrap gap-8 items-center">
            <div className="flex flex-col items-center mr-8">
              <span className="text-gray-500 text-sm">total workflows</span>
              <span className="text-3xl font-bold mt-1">{summary.total}</span>
            </div>
            <div className="flex flex-col items-center mr-8">
              <span className="text-gray-500 text-sm">completed</span>
              <span className="text-2xl font-bold mt-1 text-green-600">{summary.completed}</span>
            </div>
            <div className="flex flex-col items-center mr-8">
              <span className="text-gray-500 text-sm">pending</span>
              <span className="text-2xl font-bold mt-1 text-blue-600">{summary.pending}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-gray-500 text-sm">overdue</span>
              <span className="text-2xl font-bold mt-1 text-red-600">{summary.overdue}</span>
            </div>
          </div>
        </div>
        {/* Pie Chart Placeholder */}
        <div className="flex justify-center items-center mt-8 md:mt-0 md:ml-8">
          <svg width="120" height="120" viewBox="0 0 32 32">
            <circle r="16" cx="16" cy="16" fill="#e5e7eb" />
            <path d="M16 16 L16 0 A16 16 0 0 1 31.2 21.6 Z" fill="#4ade80" />
            <path d="M16 16 L31.2 21.6 A16 16 0 0 1 7.2 30.4 Z" fill="#60a5fa" />
            <path d="M16 16 L7.2 30.4 A16 16 0 0 1 16 0 Z" fill="#f87171" />
          </svg>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-4 mb-4">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`px-4 py-1 rounded border border-gray-300 text-sm font-medium transition-colors duration-150 ${
              filter === f.value
                ? 'bg-gray-200 border-gray-400'
                : 'bg-white hover:bg-gray-100'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="py-3 px-4 text-left font-medium">serial no.</th>
              <th className="py-3 px-4 text-left font-medium">workflow name</th>
              <th className="py-3 px-4 text-left font-medium">priority</th>
              <th className="py-3 px-4 text-left font-medium">tasks pending</th>
              <th className="py-3 px-4 text-left font-medium">due date</th>
              <th className="py-3 px-4"></th>
            </tr>
          </thead>
          <tbody>
            {filteredWorkflows.map((w, idx) => (
              <tr key={w.id} className="border-b last:border-b-0">
                <td className="py-3 px-4">{idx + 1}</td>
                <td className="py-3 px-4">{w.name}</td>
                <td className="py-3 px-4 capitalize">{w.priority}</td>
                <td className="py-3 px-4">{w.tasksPending}</td>
                <td className="py-3 px-4">{w.dueDate}</td>
                <td className="py-3 px-4">
                  <button className="px-4 py-1 bg-gray-100 rounded border border-gray-300 hover:bg-gray-200 transition text-sm font-medium">
                    view report
                  </button>
                </td>
              </tr>
            ))}
            {filteredWorkflows.length === 0 && (
              <tr>
                <td colSpan="6" className="py-6 text-center text-gray-400">No workflows found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
