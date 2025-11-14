import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userAPI } from '../../services/api';
import styles from './ForgotPassword.module.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState({ type: '', text: '' });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!email) {
            setMessage({ type: 'error', text: 'Email harus diisi' });
            setLoading(false);
            return;
        }

        try {
            const response = await userAPI.forgotPassword(email);
            setMessage({
                type: 'success',
                text: response.data.message || 'Email reset password telah dikirim. Cek inbox atau spam folder Anda.'
            });

            // Jika ada reset link (development mode), tampilkan
            if (response.data.reset_link) {
                console.log('🔗 Reset link:', response.data.reset_link);
                setMessage(prev => ({
                    type: 'info',
                    text: `${prev.text} Reset link: ${response.data.reset_link}`
                }));
            }
        } catch (error) {
            setMessage({
                type: 'error',
                text: error.response?.data?.error || 'Gagal mengirim email reset'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.forgotBox}>
                <div className={styles.header}>
                    <h2>🔐 Lupa Password?</h2>
                    <p>Masukkan email Anda untuk menerima link reset password</p>
                </div>

                {message.text && (
                    <div className={message.type === 'success' ? styles.successMessage : styles.errorMessage}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Masukkan email Anda"
                            required
                            disabled={loading}
                            className={styles.input}
                        />
                    </div>

                    <button type="submit" className={styles.button} disabled={loading}>
                        {loading ? '⏳ Mengirim...' : '📨 Kirim Link Reset'}
                    </button>
                </form>

                <div className={styles.backToLogin}>
                    <Link to="/login">← Kembali ke Login</Link>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;