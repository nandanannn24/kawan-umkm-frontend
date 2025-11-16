import axios from 'axios';

// Base URL backend Anda di Railway
const BASE_URL = 'https://kawan-umkm-backend-production.up.railway.app';

console.log('🚀 Connecting to backend:', BASE_URL);

// Create axios instance
const api = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    withCredentials: false, // Set false dulu untuk menghindari CORS issues
});

// Request interceptor - tambah token jika ada
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('kawanUmkmToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        // Log request untuk debugging
        console.log(`📤 ${config.method?.toUpperCase()} ${config.url}`, config.data || '');

        return config;
    },
    (error) => {
        console.error('❌ Request error:', error);
        return Promise.reject(error);
    }
);

// Response interceptor - handle errors
api.interceptors.response.use(
    (response) => {
        console.log(`✅ ${response.status} ${response.config.url}`, response.data);
        return response;
    },
    (error) => {
        console.error('❌ Response error:', {
            status: error.response?.status,
            url: error.config?.url,
            data: error.response?.data,
            message: error.message
        });

        // Handle unauthorized
        if (error.response?.status === 401) {
            localStorage.removeItem('kawanUmkmToken');
            localStorage.removeItem('kawanUmkmUser');
            window.location.href = '/login';
        }

        return Promise.reject(error);
    }
);

// Auth API endpoints
export const authAPI = {
    register: (userData) => api.post('/api/register', userData),
    login: (credentials) => api.post('/api/login', credentials),
    logout: () => api.post('/api/logout'),
    forgotPassword: (email) => api.post('/api/forgot-password', { email }),
    resetPassword: (data) => api.post('/api/reset-password', data),
    verifyToken: (token) => api.get(`/api/check-token/${token}`),
};

// UMKM API endpoints
export const umkmAPI = {
    getAll: (params = {}) => api.get('/api/umkm', { params }),
    getById: (id) => api.get(`/api/umkm/${id}`),
    create: (formData) => api.post('/api/umkm', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }),
    update: (id, formData) => api.put(`/api/umkm/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }),
    delete: (id) => api.delete(`/api/umkm/${id}`),
    getReviews: (id) => api.get(`/api/umkm/${id}/reviews`),
    addReview: (id, review) => api.post(`/api/umkm/${id}/reviews`, review),
    toggleFavorite: (id) => api.post(`/api/umkm/${id}/favorite`),
    getFavorites: () => api.get('/api/user/favorites'),
    getMyUMKM: () => api.get('/api/my-umkm'),
    search: (query) => api.get(`/api/umkm/search?q=${query}`),
};

// User API endpoints
export const userAPI = {
    getProfile: () => api.get('/api/user/profile'),
    updateProfile: (userData) => api.put('/api/profile', userData),
    changePassword: (passwords) => api.post('/api/change-password', passwords),
    getDashboard: () => api.get('/api/user/dashboard'),
};

// Admin API endpoints
export const adminAPI = {
    getAllUMKM: () => api.get('/api/admin/umkm'),
    approveUMKM: (id) => api.put(`/api/admin/umkm/${id}/approve`),
    rejectUMKM: (id) => api.put(`/api/admin/umkm/${id}/reject`),
    getAllUsers: () => api.get('/api/admin/users'),
    updateUserRole: (id, role) => api.put(`/api/admin/users/${id}`, { role }),
    deleteUser: (id) => api.delete(`/api/admin/users/${id}`),
    getStats: () => api.get('/api/admin/stats'),
    getDashboard: () => api.get('/api/admin/dashboard'),
};

// Test connection function
export const testConnection = async () => {
    try {
        console.log('🧪 Testing backend connection...');
        const response = await api.get('/health');
        console.log('✅ Backend is healthy:', response.data);
        return response.data;
    } catch (error) {
        console.error('❌ Backend connection failed:', error);
        throw error;
    }
};

// Export default
export default api;