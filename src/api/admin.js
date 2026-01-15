// src/api/admin.js
import api from './axios';

const adminAPI = {
  // Get dashboard data
  getDashboard: async () => {
    const response = await api.get('/admin/dashboard');
    return response.data;
  },

  // Get all submissions
  getSubmissions: async (filters = {}) => {
    const { status, page = 1, limit = 20 } = filters;
    const params = new URLSearchParams();
    
    if (status) params.append('status', status);
    params.append('page', page);
    params.append('limit', limit);
    
    const response = await api.get(`/admin/submissions?${params.toString()}`);
    return response.data;
  },

  // Get specific submission
  getSubmission: async (submissionId) => {
    const response = await api.get(`/admin/submissions/${submissionId}`);
    return response.data;
  },

  // Approve submission
  approveSubmission: async (submissionId, notes = '') => {
    const response = await api.put(`/admin/submissions/${submissionId}/approve`, {
      notes,
    });
    return response.data;
  },

  // Reject submission
  rejectSubmission: async (submissionId, rejectionReason, notes = '') => {
    const response = await api.put(`/admin/submissions/${submissionId}/reject`, {
      rejectionReason,
      notes,
    });
    return response.data;
  },

  // Get verification requests
  getVerifications: async (filters = {}) => {
    const { status, page = 1, limit = 20 } = filters;
    const params = new URLSearchParams();
    
    if (status) params.append('status', status);
    params.append('page', page);
    params.append('limit', limit);
    
    const response = await api.get(`/admin/verifications?${params.toString()}`);
    return response.data;
  },

  // Get specific verification request
  getVerification: async (verificationId) => {
    const response = await api.get(`/admin/verifications/${verificationId}`);
    return response.data;
  },

  // Process verification request
  processVerification: async (verificationId, status, notes = '') => {
    const response = await api.put(`/admin/verifications/${verificationId}/process`, {
      status,
      notes,
    });
    return response.data;
  },

  // Get all users
  getUsers: async (filters = {}) => {
    const { role, isActive, page = 1, limit = 20 } = filters;
    const params = new URLSearchParams();
    
    if (role) params.append('role', role);
    if (isActive !== undefined) params.append('isActive', isActive);
    params.append('page', page);
    params.append('limit', limit);
    
    const response = await api.get(`/admin/users?${params.toString()}`);
    return response.data;
  },

  // Get specific user
  getUser: async (userId) => {
    const response = await api.get(`/admin/users/${userId}`);
    return response.data;
  },

  // Create user
  createUser: async (userData) => {
    const response = await api.post('/admin/users', userData);
    return response.data;
  },

  // Update user
  updateUser: async (userId, userData) => {
    const response = await api.put(`/admin/users/${userId}`, userData);
    return response.data;
  },

  // Deactivate user
  deactivateUser: async (userId) => {
    const response = await api.put(`/admin/users/${userId}/deactivate`);
    return response.data;
  },

  // Activate user
  activateUser: async (userId) => {
    const response = await api.put(`/admin/users/${userId}/activate`);
    return response.data;
  },

  // Get system statistics
  getSystemStats: async () => {
    const response = await api.get('/admin/stats');
    return response.data;
  },

  // Get audit logs
  getAuditLogs: async (filters = {}) => {
    const { userId, action, startDate, endDate, page = 1, limit = 50 } = filters;
    const params = new URLSearchParams();
    
    if (userId) params.append('userId', userId);
    if (action) params.append('action', action);
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    params.append('page', page);
    params.append('limit', limit);
    
    const response = await api.get(`/admin/audit-logs?${params.toString()}`);
    return response.data;
  },

  // Export data
  exportData: async (type, filters = {}) => {
    const params = new URLSearchParams();
    Object.keys(filters).forEach(key => {
      if (filters[key]) params.append(key, filters[key]);
    });
    
    const response = await api.get(`/admin/export/${type}?${params.toString()}`, {
      responseType: 'blob',
    });
    
    // Create download link
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${type}_export_${Date.now()}.xlsx`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    
    return response.data;
  },
};

export default adminAPI;