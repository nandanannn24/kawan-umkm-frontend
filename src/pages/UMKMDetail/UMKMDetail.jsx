import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { umkmAPI } from '../../services/api';
import FadeIn from '../../components/FadeIn/FadeIn';
import Rating from '../../components/Rating/Rating'; // IMPORT RATING
import styles from './UMKMDetail.module.css';

const UMKMDetail = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('info');
    const [umkm, setUmkm] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState({ rating: 0, comment: '' }); // Default 0
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUMKMData = async () => {
            try {
                setLoading(true);
                const [umkmResponse, reviewsResponse] = await Promise.all([
                    umkmAPI.getById(id),
                    umkmAPI.getReviews(id)
                ]);
                setUmkm(umkmResponse.data);
                setReviews(reviewsResponse.data);
            } catch (err) {
                setError('Gagal memuat data UMKM');
                console.error('Error fetching UMKM data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchUMKMData();
    }, [id]);

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            alert('Silakan login terlebih dahulu untuk memberikan ulasan');
            return;
        }

        if (newReview.rating === 0) {
            alert('Silakan pilih rating terlebih dahulu');
            return;
        }

        try {
            await umkmAPI.addReview(id, newReview);
            alert('Ulasan berhasil dikirim!');
            setNewReview({ rating: 0, comment: '' });

            // Refresh reviews
            const reviewsResponse = await umkmAPI.getReviews(id);
            setReviews(reviewsResponse.data);

            // Refresh UMKM data untuk update rating
            const umkmResponse = await umkmAPI.getById(id);
            setUmkm(umkmResponse.data);
        } catch (err) {
            alert('Gagal mengirim ulasan');
            console.error('Error submitting review:', err);
        }
    };

    if (loading) {
        return (
            <div className={styles.loading}>
                <div className={styles.spinner}></div>
                <p>Memuat detail UMKM...</p>
            </div>
        );
    }

    if (error || !umkm) {
        return (
            <div className={styles.notFound}>
                <h2>UMKM tidak ditemukan</h2>
                <p>UMKM yang Anda cari tidak ada atau telah dihapus.</p>
                <Link to="/umkm" className="btn btn-primary">
                    Kembali ke Daftar UMKM
                </Link>
            </div>
        );
    }

    return (
        <div className={styles.umkmDetail}>
            <div className={styles.container}>
                {/* Header Section */}
                <FadeIn direction="up" delay={100}>
                    <div className={styles.header}>
                        {umkm.image_path ? (
                            <img
                                src={`https://kawan-umkm-backend-production.up.railway.app/api/uploads/images/${umkm.image_path}`}
                                alt={umkm.name}
                                className={styles.coverImage}
                                onError={(e) => {
                                    e.target.src = '/images/placeholder-umkm.jpg';
                                }}
                            />
                        ) : (
                            <div className={styles.coverPlaceholder}>
                                🏪
                            </div>
                        )}
                        <div className={styles.headerContent}>
                            <div className={styles.breadcrumb}>
                                <Link to="/umkm">UMKM</Link> / <span>{umkm.name}</span>
                            </div>
                            <h1 className={styles.title}>{umkm.name}</h1>
                            <div className={styles.metaInfo}>
                                <span className={styles.category}>{umkm.category}</span>
                                <div className={styles.ratingDisplay}>
                                    <Rating
                                        rating={umkm.avg_rating || 0}
                                        readOnly={true}
                                        size="small"
                                        showValue={true}
                                    />
                                    <span className={styles.reviewCount}>
                                        ({umkm.review_count || 0} ulasan)
                                    </span>
                                </div>
                            </div>
                            <p className={styles.description}>{umkm.description}</p>
                        </div>
                    </div>
                </FadeIn>

                {/* Tab Navigation */}
                <FadeIn direction="up" delay={200}>
                    <div className={styles.tabNavigation}>
                        <button
                            className={`${styles.tab} ${activeTab === 'info' ? styles.active : ''}`}
                            onClick={() => setActiveTab('info')}
                        >
                            📋 Informasi
                        </button>
                        <button
                            className={`${styles.tab} ${activeTab === 'location' ? styles.active : ''}`}
                            onClick={() => setActiveTab('location')}
                        >
                            📍 Lokasi
                        </button>
                        <button
                            className={`${styles.tab} ${activeTab === 'reviews' ? styles.active : ''}`}
                            onClick={() => setActiveTab('reviews')}
                        >
                            ⭐ Ulasan ({umkm.review_count || 0})
                        </button>
                    </div>
                </FadeIn>

                {/* Tab Content */}
                <div className={styles.tabContent}>
                    {activeTab === 'info' && (
                        <FadeIn direction="up" delay={300}>
                            <div className={styles.infoTab}>
                                <div className={styles.detailCard}>
                                    <h3>Informasi UMKM</h3>
                                    <div className={styles.detailGrid}>
                                        <div className={styles.detailItem}>
                                            <strong>Pemilik:</strong>
                                            <span>{umkm.owner_name || 'Tidak diketahui'}</span>
                                        </div>
                                        <div className={styles.detailItem}>
                                            <strong>Telepon:</strong>
                                            <span>{umkm.phone || 'Tidak tersedia'}</span>
                                        </div>
                                        <div className={styles.detailItem}>
                                            <strong>Jam Operasional:</strong>
                                            <span>{umkm.hours || 'Tidak tersedia'}</span>
                                        </div>
                                        <div className={styles.detailItem}>
                                            <strong>Alamat:</strong>
                                            <span>{umkm.address || 'Tidak tersedia'}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.detailCard}>
                                    <h3>Deskripsi</h3>
                                    <p>{umkm.description || 'Tidak ada deskripsi tersedia.'}</p>
                                </div>
                            </div>
                        </FadeIn>
                    )}

                    {activeTab === 'location' && (
                        <FadeIn direction="up" delay={300}>
                            <div className={styles.locationTab}>
                                <div className={styles.detailCard}>
                                    <h3>Lokasi</h3>
                                    <div className={styles.mapContainer}>
                                        <div className={styles.mapPlaceholder}>
                                            <div className={styles.mapContent}>
                                                <h4>📍 {umkm.address || 'Alamat tidak tersedia'}</h4>
                                                {umkm.latitude && umkm.longitude ? (
                                                    <>
                                                        <p>Koordinat: {umkm.latitude}, {umkm.longitude}</p>
                                                        <button className="btn btn-primary">
                                                            Buka di Google Maps
                                                        </button>
                                                    </>
                                                ) : (
                                                    <p>Koordinat tidak tersedia</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>
                    )}

                    {activeTab === 'reviews' && (
                        <FadeIn direction="up" delay={300}>
                            <div className={styles.reviewsTab}>
                                {/* Add Review Form */}
                                {user && (
                                    <div className={styles.addReviewCard}>
                                        <h3>Tambah Ulasan</h3>
                                        <form onSubmit={handleReviewSubmit} className={styles.reviewForm}>
                                            <div className={styles.ratingInput}>
                                                <label>Rating:</label>
                                                <Rating
                                                    rating={newReview.rating}
                                                    onRatingChange={(rating) => setNewReview({ ...newReview, rating })}
                                                    showLabel={true}
                                                    size="large"
                                                />
                                            </div>

                                            <div className={styles.commentInput}>
                                                <label>Komentar:</label>
                                                <textarea
                                                    value={newReview.comment}
                                                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                                                    placeholder="Bagikan pengalaman Anda..."
                                                    rows="4"
                                                    required
                                                />
                                            </div>

                                            <button
                                                type="submit"
                                                className="btn btn-primary"
                                                disabled={newReview.rating === 0}
                                            >
                                                Kirim Ulasan
                                            </button>
                                        </form>
                                    </div>
                                )}

                                {/* Reviews List */}
                                <div className={styles.reviewsList}>
                                    <h3>Ulasan Pelanggan ({reviews.length})</h3>

                                    {reviews.map(review => (
                                        <FadeIn key={review.id} direction="up" delay={400}>
                                            <div className={styles.reviewItem}>
                                                <div className={styles.reviewHeader}>
                                                    <div className={styles.reviewerInfo}>
                                                        <span className={styles.reviewerName}>{review.user_name}</span>
                                                        <span className={styles.reviewDate}>
                                                            {new Date(review.created_at).toLocaleDateString('id-ID')}
                                                        </span>
                                                    </div>
                                                    <div className={styles.reviewRating}>
                                                        <Rating
                                                            rating={review.rating}
                                                            readOnly={true}
                                                            size="small"
                                                        />
                                                    </div>
                                                </div>
                                                <p className={styles.reviewComment}>{review.comment}</p>
                                            </div>
                                        </FadeIn>
                                    ))}

                                    {reviews.length === 0 && (
                                        <div className={styles.noReviews}>
                                            <p>Belum ada ulasan untuk UMKM ini.</p>
                                            <p>Jadilah yang pertama memberikan ulasan!</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </FadeIn>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UMKMDetail;