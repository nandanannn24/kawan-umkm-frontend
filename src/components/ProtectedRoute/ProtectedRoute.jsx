import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '50vh',
                color: '#9B4DFF',
                fontSize: '1.2rem'
            }}>
                <div>🔄 Loading...</div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Handle multiple roles
    if (requiredRole) {
        let hasRequiredRole = false;

        if (Array.isArray(requiredRole)) {
            // Jika requiredRole adalah array, check jika user role ada di dalam array
            hasRequiredRole = requiredRole.includes(user.role);
        } else {
            // Jika requiredRole adalah string, bandingkan langsung
            hasRequiredRole = user.role === requiredRole;
        }

        if (!hasRequiredRole) {
            return (
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '50vh',
                    flexDirection: 'column',
                    gap: '1rem',
                    textAlign: 'center',
                    padding: '2rem'
                }}>
                    <h2 style={{ color: '#e53e3e' }}>❌ Akses Ditolak</h2>
                    <p>Role Anda <strong>({user.role})</strong> tidak memiliki akses ke halaman ini.</p>
                    <p>Dibutuhkan role: <strong>{Array.isArray(requiredRole) ? requiredRole.join(' atau ') : requiredRole}</strong></p>
                    <button
                        onClick={() => window.history.back()}
                        style={{
                            padding: '0.75rem 1.5rem',
                            background: '#9B4DFF',
                            color: 'white',
                            border: 'none',
                            borderRadius: '0.5rem',
                            cursor: 'pointer',
                            fontSize: '1rem'
                        }}
                    >
                        Kembali
                    </button>
                </div>
            );
        }
    }

    return children;
};

export default ProtectedRoute;