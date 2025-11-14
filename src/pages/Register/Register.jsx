import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { authAPI } from '../../services/api';
import PasswordInput from '../../components/PasswordInput/PasswordInput';
import styles from './Register.module.css';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'user'
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
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Password dan konfirmasi password tidak cocok');
            return;
        }

        if (formData.password.length < 6) {
            setError('Password harus minimal 6 karakter');
            return;
        }

        setLoading(true);

        try {
            const response = await authAPI.register({
                name: formData.name,
                email: formData.email,
                password: formData.password,
                role: formData.role
            });

            const { token, user } = response.data;

            login(user, token);

            if (user.role === 'umkm') {
                navigate('/dashboard/umkm');
            } else {
                navigate('/');
            }

        } catch (err) {
            setError(err.response?.data?.error || 'Terjadi kesalahan saat pendaftaran');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.register}>
            <div className={styles.container}>
                <div className={styles.registerCard}>
                    {/* Logo */}
                    <div className={styles.logo}>
                        <img src="/images/logo.png" alt="Kawan UMKM" className={styles.formLogoImage} />
                        <h1 className={styles.logoText}>KAWAN UMKM</h1>
                    </div>

                    <h2 className={styles.title}>Daftar Akun</h2>

                    {error && (
                        <div className={styles.error}>
                            ⚠️ {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className={styles.registerForm}>
                        <div className={styles.formGroup}>
                            <input
                                type="text"
                                name="name"
                                placeholder="Nama Lengkap"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className={styles.input}
                            />
                        </div>

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
                            <select
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                required
                                className={styles.input}
                            >
                                <option value="user">User/Pengguna</option>
                                <option value="umkm">Pemilik UMKM</option>
                            </select>
                        </div>

                        <div className={styles.formGroup}>
                            <PasswordInput
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Password (minimal 6 karakter)"
                                required
                                minLength="6"
                                className={styles.passwordInput}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <PasswordInput
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Konfirmasi Password"
                                required
                                minLength="6"
                                className={styles.passwordInput}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`btn btn-primary ${styles.registerButton}`}
                        >
                            {loading ? '⏳ Loading...' : '🚀 BERIKUTNYA'}
                        </button>
                    </form>

                    <div className={styles.divider}>
                        <span>ATAU</span>
                    </div>

                    <div className={styles.socialLogin}>
                        <button type="button" className={`btn ${styles.facebookBtn}`}>
                            <img src="/images/facebook.png" alt="Facebook" className={styles.socialIcon} />
                            Facebook
                        </button>
                        <button type="button" className={`btn ${styles.googleBtn}`}>
                            <img src="/images/google.png" alt="Google" className={styles.socialIcon} />
                            Google
                        </button>
                    </div>

                    <div className={styles.loginLink}>
                        <p>Punya Akun? <Link to="/login">Log in</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;