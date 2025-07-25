import api from './authService'

export const leaveService = {
    // Employee endpoints
    applyLeave: (leaveData) => api.post('/employee/leaves', leaveData),
    getMyLeaves: () => api.get('/employee/leaves'),
    getUpcomingLeaves: () => api.get('/employee/leaves/upcoming'),

    // Admin endpoints
    getAllLeaves: () => api.get('/admin/leaves'),
    getPendingLeaves: () => api.get('/admin/leaves/pending'),
    approveLeave: (leaveId) => api.put(`/admin/leaves/${leaveId}/approve`),
    rejectLeave: (leaveId, reason) => api.put(`/admin/leaves/${leaveId}/reject?reason=${encodeURIComponent(reason)}`),
}

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const templateService = {
  assignSteps: (data) => api.post('/admin/workflows/assign', data, getAuthHeaders()),
  getTemplates: () => api.get('/admin/workflows', getAuthHeaders()),
  getTemplate: (id) => api.get(`/admin/workflows/${id}`, getAuthHeaders()),
  getAllWorkflowStatuses: () => api.get('/admin/workflows/status', getAuthHeaders()),
  getWorkflowReport: (id) => api.get(`/admin/workflows/report/${id}`, getAuthHeaders()),
};



export const userService = {
    getProfile: () => api.get('/employee/profile'),
    updateProfile: (userData) => api.put('/employee/profile', userData),
    getAllEmployees: () => api.get('/admin/employees'),
    getEmployee: (employeeId) => api.get(`/admin/employees/${employeeId}`),
    registerUser: (userData) => api.post('/admin/users/register', userData),
    changePassword: (passwordData) => api.put('/employee/change-password', passwordData),
    getMyAssignments: () => api.get('/user/workflows', getAuthHeaders()),
    getAssignmentDetails: (id) => api.get(`/user/workflows/${id}`, getAuthHeaders()),
    updateWorkflow: (assignmentId, formData) => api.post(`/user/workflows/${assignmentId}/update`, 
        formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${localStorage.getItem("token")}`,

            },
        }),
}

export const projectService = {
    getMyProjects: () => api.get('/employee/projects'),
    getAllProjects: () => api.get('/admin/projects'),
    createProject: (projectData) => api.post('/admin/projects', projectData),
    updateProject: (projectId, projectData) => api.put(`/admin/projects/${projectId}`, projectData),
    assignMember: (projectId, memberId) => api.post(`/admin/projects/${projectId}/members/${memberId}`),
}

export const policyService = {
    getPolicies: () => api.get('/employee/policies'),
    getAllPolicies: () => api.get('/admin/policies'),
    createPolicy: (policyData) => api.post('/admin/policies', policyData),
    updatePolicy: (policyId, policyData) => api.put(`/admin/policies/${policyId}`, policyData),
    deletePolicy: (policyId) => api.delete(`/admin/policies/${policyId}`),
}

export const notificationService = {
    getNotifications: () => api.get('/employee/notifications'),
    getUnreadNotifications: () => api.get('/employee/notifications/unread'),
    markAsRead: (notificationId) => api.put(`/employee/notifications/${notificationId}/read`),
    markAllAsRead: () => api.put('/employee/notifications/read-all'),

    // Admin notifications
    getAdminNotifications: () => api.get('/admin/notifications'),
    markAdminNotificationAsRead: (notificationId) => api.put(`/admin/notifications/${notificationId}/read`),
}

export const dashboardService = {
    getEmployeeDashboard: () => api.get('/employee/dashboard'),
    getAdminDashboard: () => api.get('/admin/dashboard'),
}

export const announcementService = {
    getAnnouncements: () => api.get('/employee/announcements'),
    getAllAnnouncements: () => api.get('/admin/announcements'),
    createAnnouncement: (announcementData) => api.post('/admin/announcements', announcementData),
    updateAnnouncement: (announcementId, announcementData) => api.put(`/admin/announcements/${announcementId}`, announcementData),
    deleteAnnouncement: (announcementId) => api.delete(`/admin/announcements/${announcementId}`),
}

