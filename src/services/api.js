import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
});

// Add token to requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('kawanUmkmToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            console.log('🔐 Adding token to request:', token.substring(0, 20) + '...');
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
api.interceptors.response.use(
    (response) => {
        console.log('✅ API Response:', response.status, response.config.url);
        return response;
    },
    (error) => {
        console.error('❌ API Error:', error.response?.status, error.config?.url, error.response?.data);
        if (error.response?.status === 401) {
            localStorage.removeItem('kawanUmkmToken');
            localStorage.removeItem('kawanUmkmUser');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// Auth API
export const authAPI = {
    register: (userData) => api.post('/register', userData),
    login: (credentials) => api.post('/login', credentials),
};

// UMKM API
export const umkmAPI = {
    getAll: (params = {}) => api.get('/umkm', { params }),
    getById: (id) => api.get(`/umkm/${id}`),
    create: (formData) => {
        console.log('📤 Creating UMKM with form data');
        return api.post('/umkm', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    update: (id, formData) => api.put(`/umkm/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }),
    delete: (id) => api.delete(`/umkm/${id}`),
    getReviews: (id) => api.get(`/umkm/${id}/reviews`),
    addReview: (id, review) => api.post(`/umkm/${id}/reviews`, review),
    toggleFavorite: (id) => api.post(`/umkm/${id}/favorite`),
    getFavorites: () => api.get('/user/favorites'),
    getMyUMKM: () => api.get('/my-umkm'),
};

// User API - PERBAIKI ENDPOINT
export const userAPI = {
    getProfile: () => api.get('/user/profile'),
    updateProfile: (userData) => api.put('/profile', userData), // FIXED: dari '/user/profile' ke '/profile'
    changePassword: (passwords) => api.post('/change-password', passwords),
    forgotPassword: (email) => api.post('/forgot-password', { email }),
    resetPassword: (data) => api.post('/reset-password', data),
    verifyToken: (token) => api.get(`/check-token/${token}`)
};

// Admin API
export const adminAPI = {
    getAllUMKM: () => api.get('/admin/umkm'),
    approveUMKM: (id) => api.put(`/admin/umkm/${id}/approve`),
    rejectUMKM: (id) => api.put(`/admin/umkm/${id}/reject`),
    getAllUsers: () => api.get('/admin/users'),
    updateUserRole: (id, role) => api.put(`/admin/users/${id}`, { role }),
    deleteUser: (id) => api.delete(`/admin/users/${id}`),
    getStats: () => api.get('/admin/stats'),
};

export default api;