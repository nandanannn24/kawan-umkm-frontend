import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { userAPI } from '../../services/api';
import PasswordInput from '../../components/PasswordInput/PasswordInput';
import styles from './ResetPassword.module.css';

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get('token');

    const [formData, setFormData] = useState({
        newPassword: '',
        confirmPassword: ''
    });
    const [message, setMessage] = useState({ type: '', text: '' });
    const [loading, setLoading] = useState(false);
    const [tokenValid, setTokenValid] = useState(null);

    // Verify token on component mount
    useEffect(() => {
        const verifyToken = async () => {
            if (!token) {
                setTokenValid(false);
                return;
            }

            try {
                const response = await userAPI.verifyToken(token);
                setTokenValid(response.data.valid);
            } catch (error) {
                setTokenValid(false);
                setMessage({ type: 'error', text: 'Token tidak valid atau sudah kadaluarsa' });
            }
        };

        verifyToken();
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!token) {
            setMessage({ type: 'error', text: 'Token reset tidak valid' });
            setLoading(false);
            return;
        }

        if (formData.newPassword !== formData.confirmPassword) {
            setMessage({ type: 'error', text: 'Password dan konfirmasi password tidak cocok' });
            setLoading(false);
            return;
        }

        if (formData.newPassword.length < 6) {
            setMessage({ type: 'error', text: 'Password minimal 6 karakter' });
            setLoading(false);
            return;
        }

        try {
            await userAPI.resetPassword({
                token: token,
                newPassword: formData.newPassword
            });

            setMessage({
                type: 'success',
                text: '✅ Password berhasil direset! Mengarahkan ke halaman login...'
            });

            // Redirect setelah 3 detik
            setTimeout(() => {
                navigate('/login', {
                    replace: true,
                    state: { message: 'Password Anda telah berhasil direset. Silakan login dengan password baru.' }
                });
            }, 3000);

        } catch (error) {
            console.error('Reset password error:', error);
            const errorMessage = error.response?.data?.error || 'Gagal reset password. Silakan coba lagi.';
            setMessage({ type: 'error', text: `❌ ${errorMessage}` });
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    if (tokenValid === false) {
        return (
            <div className={styles.container}>
                <div className={styles.errorBox}>
                    <h2>❌ Token Tidak Valid</h2>
                    <p>Link reset password tidak valid atau sudah kadaluarsa.</p>
                    <p>Silakan request reset password baru.</p>
                    <button
                        onClick={() => navigate('/login')}
                        className={styles.button}
                    >
                        Kembali ke Login
                    </button>
                </div>
            </div>
        );
    }

    if (!token) {
        return (
            <div className={styles.container}>
                <div className={styles.errorBox}>
                    <h2>🔗 Token Tidak Ditemukan</h2>
                    <p>Link reset password tidak valid.</p>
                    <button
                        onClick={() => navigate('/login')}
                        className={styles.button}
                    >
                        Kembali ke Login
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.resetBox}>
                <div className={styles.header}>
                    <h2>🔐 Reset Password</h2>
                    <p>Masukkan password baru Anda</p>
                </div>

                {message.text && (
                    <div className={message.type === 'success' ? styles.successMessage : styles.errorMessage}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label htmlFor="newPassword">Password Baru *</label>
                        <PasswordInput
                            id="newPassword"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleInputChange}
                            placeholder="Masukkan password baru (min. 6 karakter)"
                            required
                            disabled={loading}
                            minLength="6"
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="confirmPassword">Konfirmasi Password *</label>
                        <PasswordInput
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            placeholder="Konfirmasi password baru"
                            required
                            disabled={loading}
                            minLength="6"
                        />
                    </div>

                    <button
                        type="submit"
                        className={styles.submitButton}
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <span className={styles.spinner}></span>
                                Memproses...
                            </>
                        ) : (
                            '🔐 Reset Password'
                        )}
                    </button>
                </form>

                <div className={styles.footer}>
                    <p>Ingat password Anda? <a href="/login" onClick={(e) => { e.preventDefault(); navigate('/login'); }}>Kembali ke Login</a></p>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;