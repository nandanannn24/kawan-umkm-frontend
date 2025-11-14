import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { umkmAPI, userAPI } from '../../services/api';
import FadeIn from '../../components/FadeIn/FadeIn';
import styles from './Dashboard.module.css';

const UserDashboard = () => {
    const { user } = useAuth();
    const [favorites, setFavorites] = useState([]);
    const [recentActivity, setRecentActivity] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        favoritesCount: 0,
        reviewsCount: 0,
        visitedCount: 0
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setLoading(true);

                const favResponse = await umkmAPI.getFavorites();
                const favoritesData = favResponse.data?.slice(0, 3) || [];
                setFavorites(favoritesData);
                setStats(prev => ({ ...prev, favoritesCount: favoritesData.length }));

                const activities = [
                    {
                        id: 1,
                        type: 'review',
                        message: `Anda memberikan ulasan untuk Geprek Mbak Rara`,
                        time: '2 hari yang lalu',
                        icon: '⭐'
                    },
                    {
                        id: 2,
                        type: 'favorite',
                        message: `Anda menambahkan Bakso Manjur ke favorit`,
                        time: '1 minggu yang lalu',
                        icon: '❤️'
                    }
                ];
                setRecentActivity(activities);
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) {
        return (
            <div className={styles.loading}>
                <div className={styles.spinner}></div>
                <p>Memuat dashboard...</p>
            </div>
        );
    }

    return (
        <div className={styles.userDashboard}>
            <FadeIn direction="up" delay={100}>
                <div className={styles.welcomeSection}>
                    <h1>Selamat Datang, {user?.name}!</h1>
                    <p>Jelajahi UMKM terdekat dan berikan ulasan untuk membantu UMKM berkembang.</p>
                </div>
            </FadeIn>

            <FadeIn direction="up" delay={200}>
                <div className={styles.dashboardGrid}>
                    <div className={styles.dashboardCard}>
                        <div className={styles.cardIcon}>🔍</div>
                        <h3>Jelajahi UMKM</h3>
                        <p>Temukan UMKM terdekat di sekitar UPN Veteran Jakarta</p>
                        <Link to="/umkm" className="btn btn-primary">Jelajahi Sekarang</Link>
                    </div>

                    <div className={styles.dashboardCard}>
                        <div className={styles.cardIcon}>⭐</div>
                        <h3>Ulasan Saya</h3>
                        <p>Lihat dan kelola ulasan yang sudah Anda berikan</p>
                        <Link to="/profile#reviews" className="btn btn-secondary">Lihat Ulasan</Link>
                    </div>

                    <div className={styles.dashboardCard}>
                        <div className={styles.cardIcon}>❤️</div>
                        <h3>Favorit Saya</h3>
                        <p>{stats.favoritesCount} UMKM favorit</p>
                        <Link to="/profile#favorites" className="btn btn-secondary">Lihat Favorit</Link>
                    </div>

                    <div className={styles.dashboardCard}>
                        <div className={styles.cardIcon}>👤</div>
                        <h3>Profil Saya</h3>
                        <p>Atur informasi akun dan preferensi Anda</p>
                        <Link to="/profile" className="btn btn-secondary">Edit Profil</Link>
                    </div>
                </div>
            </FadeIn>

            {/* Quick Stats */}
            <FadeIn direction="up" delay={300}>
                <div className={styles.quickStats}>
                    <div className={styles.statItem}>
                        <div className={styles.statNumber}>{stats.favoritesCount}</div>
                        <div className={styles.statLabel}>UMKM Favorit</div>
                    </div>
                    <div className={styles.statItem}>
                        <div className={styles.statNumber}>{stats.reviewsCount}</div>
                        <div className={styles.statLabel}>Ulasan Diberikan</div>
                    </div>
                    <div className={styles.statItem}>
                        <div className={styles.statNumber}>{stats.visitedCount}</div>
                        <div className={styles.statLabel}>UMKM Dikunjungi</div>
                    </div>
                </div>
            </FadeIn>

            {/* Recent Activity */}
            <FadeIn direction="up" delay={400}>
                <div className={styles.activitySection}>
                    <h2>Aktivitas Terbaru</h2>
                    <div className={styles.activityList}>
                        {recentActivity.map(activity => (
                            <div key={activity.id} className={styles.activityItem}>
                                <span className={styles.activityIcon}>{activity.icon}</span>
                                <div className={styles.activityContent}>
                                    <p>{activity.message}</p>
                                    <span className={styles.activityTime}>{activity.time}</span>
                                </div>
                            </div>
                        ))}

                        {recentActivity.length === 0 && (
                            <div className={styles.noActivity}>
                                <p>Belum ada aktivitas terbaru</p>
                                <Link to="/umkm" className="btn btn-primary">Jelajahi UMKM</Link>
                            </div>
                        )}
                    </div>
                </div>
            </FadeIn>
        </div>
    );
};

export default UserDashboard;