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

export const userService = {
    getProfile: () => api.get('/employee/profile'),
    updateProfile: (userData) => api.put('/employee/profile', userData),
    getAllEmployees: () => api.get('/admin/employees'),
    getEmployee: (employeeId) => api.get(`/admin/employees/${employeeId}`),
    registerUser: (userData) => api.post('/admin/users/register', userData),
    changePassword: (passwordData) => api.put('/employee/change-password', passwordData),
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

export const templateService = {
    getTemplates: () => api.get('/templates'),
    getTemplate: (id) => api.get(`/templates/${id}`),
    assignSteps: (id, assignments) => api.post(`/templates/${id}/assign`, { assignments }),
    createTemplate: (data) => api.post('/templates', data),
}; 