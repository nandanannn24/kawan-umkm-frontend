import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { umkmAPI } from '../../services/api';
import styles from './Dashboard.module.css';

const UMKMDashboard = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('overview');
    const [myUMKM, setMyUMKM] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalUMKM: 0,
        avgRating: 0,
        totalReviews: 0,
        totalVisitors: 0
    });

    useEffect(() => {
        const fetchMyUMKM = async () => {
            try {
                setLoading(true);
                const response = await umkmAPI.getMyUMKM();
                const umkmData = response.data;
                setMyUMKM(umkmData);

                const totalUMKM = umkmData.length;
                const avgRating = umkmData.length > 0
                    ? umkmData.reduce((sum, umkm) => sum + (umkm.avg_rating || 0), 0) / umkmData.length
                    : 0;
                const totalReviews = umkmData.reduce((sum, umkm) => sum + (umkm.review_count || 0), 0);
                const totalVisitors = umkmData.reduce((sum, umkm) => sum + (Math.floor((umkm.review_count || 0) * 10)), 0);

                setStats({
                    totalUMKM,
                    avgRating: avgRating.toFixed(1),
                    totalReviews,
                    totalVisitors: totalVisitors.toLocaleString()
                });
            } catch (error) {
                console.error('Error fetching UMKM data:', error);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchMyUMKM();
        }
    }, [user]);

    const handleDeleteUMKM = async (umkmId) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus UMKM ini?')) {
            try {
                await umkmAPI.delete(umkmId);
                setMyUMKM(myUMKM.filter(umkm => umkm.id !== umkmId));
                alert('UMKM berhasil dihapus');
            } catch (error) {
                console.error('Error deleting UMKM:', error);
                alert('Gagal menghapus UMKM');
            }
        }
    };

    if (loading) {
        return (
            <div className={styles.loading}>
                <div className={styles.spinner}></div>
                <p>Memuat dashboard...</p>
            </div>
        );
    }

    return (
        <div className={styles.umkmDashboard}>
            <div className={styles.welcomeSection}>
                <h1>Dashboard UMKM</h1>
                <p>Kelola bisnis Anda dan lihat performa UMKM</p>
            </div>

            {/* Quick Stats */}
            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <div className={styles.statNumber}>{stats.totalUMKM}</div>
                    <div className={styles.statLabel}>Total UMKM</div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statNumber}>{stats.avgRating}</div>
                    <div className={styles.statLabel}>Rating Rata-rata</div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statNumber}>{stats.totalReviews}</div>
                    <div className={styles.statLabel}>Total Ulasan</div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statNumber}>{stats.totalVisitors}</div>
                    <div className={styles.statLabel}>Pengunjung</div>
                </div>
            </div>

            {/* Tab Navigation */}
            <div className={styles.tabNavigation}>
                <button
                    className={`${styles.tab} ${activeTab === 'overview' ? styles.active : ''}`}
                    onClick={() => setActiveTab('overview')}
                >
                    📊 Overview
                </button>
                <button
                    className={`${styles.tab} ${activeTab === 'umkm' ? styles.active : ''}`}
                    onClick={() => setActiveTab('umkm')}
                >
                    🏪 Kelola UMKM
                </button>
                <button
                    className={`${styles.tab} ${activeTab === 'reviews' ? styles.active : ''}`}
                    onClick={() => setActiveTab('reviews')}
                >
                    ⭐ Ulasan
                </button>
            </div>

            {/* Tab Content */}
            <div className={styles.tabContent}>
                {activeTab === 'overview' && (
                    <div className={styles.overviewTab}>
                        <div className={styles.dashboardCard}>
                            <h3>UMKM Saya</h3>
                            <div className={styles.umkmList}>
                                {myUMKM.map(umkm => (
                                    <div key={umkm.id} className={styles.umkmItem}>
                                        {umkm.image_path ? (
                                            <img
                                                src={`http://localhost:5000/uploads/images/${umkm.image_path}`}
                                                alt={umkm.name}
                                            />
                                        ) : (
                                            <div className={styles.imagePlaceholder}>🏪</div>
                                        )}
                                        <div className={styles.umkmInfo}>
                                            <h4>{umkm.name}</h4>
                                            <p>{umkm.category}</p>
                                            <div className={styles.rating}>
                                                ⭐ {umkm.avg_rating ? umkm.avg_rating.toFixed(1) : '0.0'} • {umkm.review_count || 0} ulasan
                                            </div>
                                        </div>
                                        <Link to={`/umkm/${umkm.id}`} className="btn btn-secondary">
                                            Kelola
                                        </Link>
                                    </div>
                                ))}
                            </div>

                            {myUMKM.length === 0 && (
                                <div className={styles.sectionHeader}>
                                    <h3>Kelola UMKM</h3>
                                    <div className={styles.addButtonContainer}>
                                        <Link to="/create-umkm" className="btn btn-primary">
                                            + Tambah UMKM Baru
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === 'umkm' && (
                    <div className={styles.umkmTab}>
                        <div className={styles.sectionHeader}>
                            <h3>Kelola UMKM</h3>
                            <Link to="/create-umkm" className="btn btn-primary">
                                + Tambah UMKM Baru
                            </Link>
                        </div>

                        <div className={styles.umkmGrid}>
                            {myUMKM.map(umkm => (
                                <div key={umkm.id} className={styles.umkmCard}>
                                    {umkm.image_path ? (
                                        <img
                                            src={`http://localhost:5000/uploads/images/${umkm.image_path}`}
                                            alt={umkm.name}
                                        />
                                    ) : (
                                        <div className={styles.cardImagePlaceholder}>🏪</div>
                                    )}
                                    <div className={styles.umkmContent}>
                                        <h4>{umkm.name}</h4>
                                        <p className={styles.category}>{umkm.category}</p>
                                        <p className={styles.description}>{umkm.description}</p>
                                        <div className={styles.actions}>
                                            <Link
                                                to={`/edit-umkm/${umkm.id}`}
                                                className="btn btn-secondary"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDeleteUMKM(umkm.id)}
                                                className="btn btn-danger"
                                            >
                                                Hapus
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {myUMKM.length === 0 && (
                            <div className={styles.emptyState}>
                                <h4>Belum ada UMKM</h4>
                                <p>Mulai dengan menambahkan UMKM pertama Anda</p>
                                <Link to="/create-umkm" className="btn btn-primary">
                                    + Tambah UMKM
                                </Link>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'reviews' && (
                    <div className={styles.reviewsTab}>
                        <h3>Ulasan Terbaru</h3>
                        <div className={styles.reviewsList}>
                            {myUMKM.length > 0 ? (
                                myUMKM.map(umkm => (
                                    (umkm.review_count > 0) ? (
                                        <div key={umkm.id} className={styles.umkmReviewsSection}>
                                            <h4>{umkm.name}</h4>
                                            <div className={styles.reviewItem}>
                                                <div className={styles.reviewHeader}>
                                                    <strong>Loading reviews...</strong>
                                                    <span className={styles.rating}>⭐</span>
                                                </div>
                                                <p>Memuat ulasan untuk {umkm.name}</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div key={umkm.id} className={styles.noReviews}>
                                            <p>{umkm.name} - Belum ada ulasan</p>
                                        </div>
                                    )
                                ))
                            ) : (
                                <div className={styles.noReviews}>
                                    <p>Belum ada UMKM untuk ditampilkan ulasan</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UMKMDashboard;