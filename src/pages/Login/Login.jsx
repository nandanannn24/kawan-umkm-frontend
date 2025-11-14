import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { authAPI } from '../../services/api';
import FadeIn from '../../components/FadeIn/FadeIn';
import PasswordInput from '../../components/PasswordInput/PasswordInput';
import styles from './Login.module.css';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        setError('');
        if (!formData.email || !formData.password) {
            setError('Email dan password harus diisi');
            return;
        }

        setLoading(true);

        try {
            const response = await authAPI.login(formData);
            const { token, user } = response.data;

            if (!token || !user) {
                throw new Error('Invalid response from server');
            }

            login(user, token);

            setTimeout(() => {
                if (user.role === 'admin') {
                    navigate('/admin/dashboard');
                } else if (user.role === 'umkm') {
                    navigate('/dashboard/umkm');
                } else {
                    navigate('/');
                }
            }, 100);

        } catch (err) {
            console.error('Login error:', err);
            setError(err.response?.data?.error || 'Terjadi kesalahan saat login. Coba lagi.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.login}>
            <div className={styles.container}>
                <div className={styles.loginCard}>
                    {/* Logo */}
                    <div className={styles.logo}>
                        <img src="/images/logo.png" alt="Kawan UMKM" className={styles.formLogoImage} />
                        <h1 className={styles.logoText}>KAWAN UMKM</h1>
                    </div>

                    <h2 className={styles.title}>Log In</h2>

                    {error && (
                        <div className={styles.error}>
                            ⚠️ {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className={styles.loginForm}>
                        <div className={styles.formGroup}>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className={styles.input}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <PasswordInput
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Password"
                                required
                                className={styles.passwordInput}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`btn btn-primary ${styles.loginButton}`}
                        >
                            {loading ? '⏳ Loading...' : '🚀 Log In'}
                        </button>
                    </form>

                    <div className={styles.forgotPassword}>
                        <Link to="/forgot-password">Lupa Password?</Link>
                    </div>

                    <div className={styles.registerLink}>
                        <p>Baru di Kawan UMKM? <Link to="/register">Daftar</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;