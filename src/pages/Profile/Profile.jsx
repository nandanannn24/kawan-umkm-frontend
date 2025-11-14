import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { userAPI } from '../../services/api'; // IMPORT userAPI
import styles from './Profile.module.css';

const Profile = () => {
    const { user, token, updateUser, logout } = useAuth();
    const [activeTab, setActiveTab] = useState('profile');
    const [userStats, setUserStats] = useState({
        favorite_count: 0,
        review_count: 0,
        rating_count: 0,
    });
    const [resetPasswordData, setResetPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [forgotPasswordData, setForgotPasswordData] = useState({
        email: ''
    });
    const [message, setMessage] = useState({ type: '', text: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({
        name: '',
        email: ''
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setUserStats({
                favorite_count: user.favorite_count || 0,
                review_count: user.review_count || 0,
                rating_count: user.rating_count || 0,
                joined_date: user.joined_date || <p>{userStats.joined_date}</p>
            });
            setEditData({
                name: user.name || '',
                email: user.email || ''
            });
            setForgotPasswordData({
                email: user.email || ''
            });
        }
    }, [user]);

    const formatRole = (role) => {
        const roleMap = {
            'user': 'Pengguna',
            'umkm': 'Pemilik UMKM',
            'admin': 'Administrator'
        };
        return roleMap[role] || role;
    };

    const showMessage = (type, text) => {
        setMessage({ type, text });
        setTimeout(() => setMessage({ type: '', text: '' }), 5000);
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (resetPasswordData.newPassword !== resetPasswordData.confirmPassword) {
            showMessage('error', 'Password baru dan konfirmasi password tidak cocok');
            setLoading(false);
            return;
        }

        if (resetPasswordData.newPassword.length < 6) {
            showMessage('error', 'Password minimal 6 karakter');
            setLoading(false);
            return;
        }

        try {
            // GUNAKAN userAPI.changePassword
            await userAPI.changePassword({
                currentPassword: resetPasswordData.currentPassword,
                newPassword: resetPasswordData.newPassword
            });

            showMessage('success', 'Password berhasil diubah');
            setResetPasswordData({
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            });
        } catch (error) {
            showMessage('error', error.response?.data?.error || 'Gagal mengubah password');
        } finally {
            setLoading(false);
        }
    };

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // GUNAKAN userAPI.forgotPassword
            const response = await userAPI.forgotPassword(forgotPasswordData.email);
            showMessage('success', response.data.message || 'Email reset password telah dikirim');

            // Jika ada reset link (development mode), tampilkan
            if (response.data.reset_link) {
                console.log('🔗 Reset link:', response.data.reset_link);
                showMessage('info', `Reset link: ${response.data.reset_link}`);
            }
        } catch (error) {
            showMessage('error', error.response?.data?.error || 'Gagal mengirim email reset');
        } finally {
            setLoading(false);
        }
    };

    const handleEditProfile = async (e) => {
        e.preventDefault();
        setLoading(true);
        console.log('🔄 Starting profile update...');

        try {
            console.log('📤 Sending update request:', editData);

            // GUNAKAN userAPI.updateProfile
            const response = await userAPI.updateProfile({
                name: editData.name,
                email: editData.email
            });

            console.log('✅ Profile update successful:', response.data);

            // Update user context dengan data baru dari response
            updateUser(response.data.user);
            setIsEditing(false);
            showMessage('success', 'Profil berhasil diupdate');

        } catch (error) {
            console.error('🔥 Edit profile error:', error);

            // Handle token expired
            if (error.response?.status === 401) {
                showMessage('error', 'Sesi telah berakhir, silakan login kembali');
                logout();
                return;
            }

            showMessage('error', error.response?.data?.error || 'Gagal mengupdate profil');
        } finally {
            setLoading(false);
        }
    };

    const renderProfileInfo = () => (
        <div className={styles.tabContent}>
            {message.text && (
                <div className={message.type === 'success' ? styles.successMessage : styles.errorMessage}>
                    {message.text}
                </div>
            )}

            {!isEditing ? (
                <>
                    <div className={styles.infoGrid}>
                        <div className={styles.infoItem}>
                            <div className={styles.infoIcon}>👤</div>
                            <div className={styles.infoContent}>
                                <label>Nama Lengkap</label>
                                <p>{user?.name || '-'}</p>
                            </div>
                        </div>
                        <div className={styles.infoItem}>
                            <div className={styles.infoIcon}>📧</div>
                            <div className={styles.infoContent}>
                                <label>Email</label>
                                <p>{user?.email || '-'}</p>
                            </div>
                        </div>
                        <div className={styles.infoItem}>
                            <div className={styles.infoIcon}>🎯</div>
                            <div className={styles.infoContent}>
                                <label>Role</label>
                                <span className={styles.roleBadge}>{formatRole(user?.role)}</span>
                            </div>
                        </div>
                        <div className={styles.infoItem}>
                            <div className={styles.infoIcon}>📅</div>
                            <div className={styles.infoContent}>
                                <label>Bergabung Sejak</label>
                                <p>{userStats.joined_date}</p>
                            </div>
                        </div>
                    </div>

                    <div className={styles.editButtonContainer}>
                        <button
                            onClick={() => setIsEditing(true)}
                            className={styles.editButton}
                            disabled={loading}
                        >
                            {loading ? '⏳' : '✏️'} Edit Profil
                        </button>
                    </div>
                </>
            ) : (
                <form onSubmit={handleEditProfile} className={styles.editForm}>
                    <div className={styles.formGroup}>
                        <label htmlFor="name">Nama Lengkap *</label>
                        <input
                            type="text"
                            id="name"
                            value={editData.name}
                            onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                            required
                            disabled={loading}
                            minLength="2"
                            placeholder="Masukkan nama lengkap"
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="email">Email *</label>
                        <input
                            type="email"
                            id="email"
                            value={editData.email}
                            onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                            required
                            disabled={loading}
                            placeholder="Masukkan email"
                        />
                    </div>
                    <div className={styles.formActions}>
                        <button type="submit" className={styles.saveButton} disabled={loading}>
                            {loading ? '⏳ Menyimpan...' : '💾 Simpan Perubahan'}
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setIsEditing(false);
                                setEditData({
                                    name: user?.name || '',
                                    email: user?.email || ''
                                });
                            }}
                            className={styles.cancelButton}
                            disabled={loading}
                        >
                            ❌ Batalkan
                        </button>
                    </div>
                </form>
            )}
        </div>
    );

    const renderActivity = () => (
        <div className={styles.tabContent}>
            <div className={styles.activityGrid}>
                <div className={styles.activityCard}>
                    <div className={styles.activityIcon}>❤️</div>
                    <div className={styles.activityContent}>
                        <h3>UMKM Disukai</h3>
                        <span className={styles.activityCount}>{userStats.favorite_count}</span>
                    </div>
                </div>
                <div className={styles.activityCard}>
                    <div className={styles.activityIcon}>📝</div>
                    <div className={styles.activityContent}>
                        <h3>Ulasan Ditulis</h3>
                        <span className={styles.activityCount}>{userStats.review_count}</span>
                    </div>
                </div>
                <div className={styles.activityCard}>
                    <div className={styles.activityIcon}>⭐</div>
                    <div className={styles.activityContent}>
                        <h3>Rating Diberikan</h3>
                        <span className={styles.activityCount}>{userStats.rating_count}</span>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderResetPassword = () => (
        <div className={styles.tabContent}>
            {message.text && (
                <div className={message.type === 'success' ? styles.successMessage : styles.errorMessage}>
                    {message.text}
                </div>
            )}

            <div className={styles.passwordSections}>
                {/* Reset Password dengan Current Password */}
                <div className={styles.passwordSection}>
                    <h3 className={styles.sectionTitle}>🔐 Ubah Password</h3>
                    <p className={styles.sectionDescription}>
                        Ubah password Anda dengan memasukkan password saat ini
                    </p>
                    <form onSubmit={handleResetPassword} className={styles.resetPasswordForm}>
                        <div className={styles.formGroup}>
                            <label htmlFor="currentPassword">Password Saat Ini *</label>
                            <input
                                type="password"
                                id="currentPassword"
                                value={resetPasswordData.currentPassword}
                                onChange={(e) => setResetPasswordData({ ...resetPasswordData, currentPassword: e.target.value })}
                                required
                                placeholder="Masukkan password saat ini"
                                disabled={loading}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="newPassword">Password Baru *</label>
                            <input
                                type="password"
                                id="newPassword"
                                value={resetPasswordData.newPassword}
                                onChange={(e) => setResetPasswordData({ ...resetPasswordData, newPassword: e.target.value })}
                                required
                                placeholder="Masukkan password baru (min. 6 karakter)"
                                disabled={loading}
                                minLength="6"
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="confirmPassword">Konfirmasi Password Baru *</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                value={resetPasswordData.confirmPassword}
                                onChange={(e) => setResetPasswordData({ ...resetPasswordData, confirmPassword: e.target.value })}
                                required
                                placeholder="Konfirmasi password baru"
                                disabled={loading}
                                minLength="6"
                            />
                        </div>
                        <button type="submit" className={styles.submitButton} disabled={loading}>
                            {loading ? '⏳ Mengubah Password...' : '✅ Ubah Password'}
                        </button>
                    </form>
                </div>

                {/* Forgot Password Section */}
                <div className={styles.passwordSection}>
                    <h3 className={styles.sectionTitle}>📧 Lupa Password?</h3>
                    <p className={styles.sectionDescription}>
                        Kirim link reset password ke email Anda. Link akan berlaku selama 1 jam.
                    </p>
                    <form onSubmit={handleForgotPassword} className={styles.forgotPasswordForm}>
                        <div className={styles.formGroup}>
                            <label htmlFor="forgotEmail">Email *</label>
                            <input
                                type="email"
                                id="forgotEmail"
                                value={forgotPasswordData.email}
                                onChange={(e) => setForgotPasswordData({ email: e.target.value })}
                                required
                                placeholder="Masukkan email Anda"
                                disabled={loading}
                            />
                        </div>
                        <button type="submit" className={styles.forgotButton} disabled={loading}>
                            {loading ? '⏳ Mengirim Email...' : '📨 Kirim Link Reset'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );

    return (
        <div className={styles.profile}>
            {/* Animated Background Elements */}
            <div className={styles.bgElements}>
                <div className={`${styles.bgElement} ${styles.element1}`}>✦</div>
                <div className={`${styles.bgElement} ${styles.element2}`}>◆</div>
                <div className={`${styles.bgElement} ${styles.element3}`}>◈</div>
                <div className={`${styles.bgElement} ${styles.element4}`}>◐</div>
            </div>

            <div className={styles.container}>
                <h1 className={styles.title}>Profil Saya</h1>

                <div className={styles.profileCard}>
                    {/* Header Section */}
                    <div className={styles.avatarSection}>
                        <div className={styles.avatarContainer}>
                            <div className={styles.avatar}>
                                {user?.name?.charAt(0).toUpperCase() || 'U'}
                            </div>
                            <div className={styles.avatarGlow}></div>
                        </div>
                        <h2>{user?.name || 'User'}</h2>
                        <p className={styles.role}>{formatRole(user?.role)}</p>
                        <div className={styles.memberSince}>
                            🎉 Anggota sejak {userStats.joined_date}
                        </div>
                    </div>

                    {/* Tab Navigation */}
                    <div className={styles.tabNavigation}>
                        <button
                            className={`${styles.tabButton} ${activeTab === 'profile' ? styles.active : ''}`}
                            onClick={() => setActiveTab('profile')}
                        >
                            <span className={styles.tabIcon}>👤</span>
                            Informasi Profil
                        </button>
                        <button
                            className={`${styles.tabButton} ${activeTab === 'activity' ? styles.active : ''}`}
                            onClick={() => setActiveTab('activity')}
                        >
                            <span className={styles.tabIcon}>📊</span>
                            Aktivitas Saya
                        </button>
                        <button
                            className={`${styles.tabButton} ${activeTab === 'resetPassword' ? styles.active : ''}`}
                            onClick={() => setActiveTab('resetPassword')}
                        >
                            <span className={styles.tabIcon}>🔒</span>
                            Keamanan Akun
                        </button>
                    </div>

                    {/* Tab Content */}
                    <div className={styles.tabContainer}>
                        {activeTab === 'profile' && renderProfileInfo()}
                        {activeTab === 'activity' && renderActivity()}
                        {activeTab === 'resetPassword' && renderResetPassword()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;