import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const workflowsData = [
  { id: 1, name: 'abc', priority: 'high', tasksPending: '2/8', dueDate: '12/06/2024', status: 'pending' },
  { id: 2, name: 'def', priority: 'medium', tasksPending: '1/5', dueDate: '15/06/2024', status: 'completed' },
  { id: 3, name: 'ghi', priority: 'medium', tasksPending: '3/8', dueDate: '18/06/2024', status: 'pending' },
  { id: 4, name: 'jkl', priority: 'low', tasksPending: '2/7', dueDate: '20/06/2024', status: 'overdue' },
];

const filters = [
  { label: 'All', value: 'all' },
  { label: 'Completed', value: 'completed' },
  { label: 'Pending', value: 'pending' },
  { label: 'Overdue', value: 'overdue' },
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

  const summary = {
    total: workflowsData.length,
    completed: workflowsData.filter(w => w.status === 'completed').length,
    pending: workflowsData.filter(w => w.status === 'pending').length,
    overdue: workflowsData.filter(w => w.status === 'overdue').length,
  };

  const filteredWorkflows =
    filter === 'all'
      ? workflowsData
      : workflowsData.filter((w) => w.status === filter);

  const pieData = {
  labels: ['Completed', 'Pending', 'Overdue'],
  datasets: [
    {
      label: 'Workflow Status',
      data: [summary.completed, summary.pending, summary.overdue],
      backgroundColor: ['#4ade80', '#60a5fa', '#f87171'],
      borderWidth: 1,
    },
  ],
};

const pieOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'right',
      labels: {
        boxWidth: 20,
        padding: 15,
      },
    },
  },
  layout: {
    padding: {
      top: 10,
      right: 20,
      bottom: 10,
      left: 10,
    },
  },
};


  return (
    <div className="p-6 w-full min-h-screen bg-gray-50">
      <div className="bg-white rounded-2xl shadow p-6 flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div className="flex-1">
          <div className="text-lg font-medium mb-2">Workflow Overview</div>
          <div className="flex flex-wrap gap-8 items-center">
            <div className="flex flex-col items-center mr-8">
              <span className="text-gray-500 text-sm">Total Workflows</span>
              <span className="text-3xl font-bold mt-1">{summary.total}</span>
            </div>
            <div className="flex flex-col items-center mr-8">
              <span className="text-gray-500 text-sm">Completed</span>
              <span className="text-2xl font-bold mt-1 text-green-600">{summary.completed}</span>
            </div>
            <div className="flex flex-col items-center mr-8">
              <span className="text-gray-500 text-sm">Pending</span>
              <span className="text-2xl font-bold mt-1 text-blue-600">{summary.pending}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-gray-500 text-sm">Overdue</span>
              <span className="text-2xl font-bold mt-1 text-red-600">{summary.overdue}</span>
            </div>
          </div>
        </div>

        {/* Actual Pie Chart */}
        <div className="w-[280px] h-[280px] mt-8 md:mt-0 md:ml-8">
            <Pie data={pieData} options={pieOptions} />
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
              <th className="py-3 px-4 text-left font-medium">Serial No.</th>
              <th className="py-3 px-4 text-left font-medium">Workflow Name</th>
              <th className="py-3 px-4 text-left font-medium">Priority</th>
              <th className="py-3 px-4 text-left font-medium">Tasks Pending</th>
              <th className="py-3 px-4 text-left font-medium">Due Date</th>
              <th className="py-3 px-4"></th>
            </tr>
          </thead>
          <tbody>
            {filteredWorkflows.map((w, idx) => (
              <tr key={w.id} className="border-b last:border-b-0">
                <td className="py-3 px-4">{idx + 1}</td>
                <td className={`py-3 px-4 font-semibold ${getStatusColor(w.status)}`}>
                {w.name}
                </td>
                <td className="py-3 px-4 capitalize">{w.priority}</td>
                <td className="py-3 px-4">{w.tasksPending}</td>
                <td className="py-3 px-4">{w.dueDate}</td>
                <td className="py-3 px-4">
                  <button className="px-4 py-1 bg-gray-100 rounded border border-gray-300 hover:bg-gray-200 transition text-sm font-medium">
                    View Report
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
