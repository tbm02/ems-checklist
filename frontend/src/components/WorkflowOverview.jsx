import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { templateService } from '../services/apiService';

export default function WorkflowOverview() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchTemplates() {
      try {
        const res = await templateService.getTemplates();
        setTemplates(res.data || []);
      } catch (err) {
        setTemplates([]);
      } finally {
        setLoading(false);
      }
    }
    fetchTemplates();
  }, []);

  return (
    <div className="p-6 w-full min-h-screen bg-gray-50">
      <div className="bg-white rounded-2xl shadow p-6 flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div className="flex-1">
          <div className="text-lg font-medium mb-2">Workflow Templates</div>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => navigate('/admin/create-template')}
        >
          + Create New Template
        </button>
      </div>
      <div className="bg-white rounded-2xl shadow overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="py-3 px-4 text-left font-medium">Serial No.</th>
              <th className="py-3 px-4 text-left font-medium">Template Name</th>
              <th className="py-3 px-4 text-left font-medium">Priority</th>
              <th className="py-3 px-4 text-left font-medium">Steps</th>
              <th className="py-3 px-4"></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="5" className="py-6 text-center text-gray-400">Loading...</td></tr>
            ) : templates.length === 0 ? (
              <tr><td colSpan="5" className="py-6 text-center text-gray-400">No templates found.</td></tr>
            ) : (
              templates.map((tpl, idx) => (
                <tr key={tpl.id} className="border-b last:border-b-0">
                  <td className="py-3 px-4">{idx + 1}</td>
                  <td className="py-3 px-4 font-semibold">{tpl.title}</td>
                  <td className="py-3 px-4 capitalize">{tpl.priority}</td>
                  <td className="py-3 px-4">{tpl.steps?.length || 0}</td>
                  <td className="py-3 px-4">
                    <button
                      className="btn btn-secondary"
                      onClick={() => navigate(`/admin/assign-steps?templateId=${tpl.id}`)}
                    >
                      Assign Steps
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
