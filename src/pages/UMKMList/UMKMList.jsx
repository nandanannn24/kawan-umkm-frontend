import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { umkmAPI } from '../../services/api';
import FadeIn from '../../components/FadeIn/FadeIn';
import styles from './UMKMList.module.css';
import useAnimateOnScroll from '../../hooks/useAnimateOnScroll';

const UMKMList = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [sortBy, setSortBy] = useState('rating');
    const [umkmList, setUmkmList] = useState([]);
    const [filteredUMKM, setFilteredUMKM] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useAnimateOnScroll();
    // Fetch UMKM data from backend
    useEffect(() => {
        const fetchUMKM = async () => {
            try {
                setLoading(true);
                console.log('🔄 Fetching UMKM data...');
                const response = await umkmAPI.getAll();
                console.log('✅ UMKM data received:', response.data);
                setUmkmList(response.data);
                setFilteredUMKM(response.data);
            } catch (err) {
                console.error('❌ Error fetching UMKM:', err);
                console.error('Error details:', err.response?.data);
                setError('Gagal memuat data UMKM: ' + (err.response?.data?.error || err.message));
            } finally {
                setLoading(false);
            }
        };

        fetchUMKM();
    }, []);

    // Filter UMKM based on search and category
    useEffect(() => {
        let results = umkmList;

        // Filter by search term
        if (searchTerm) {
            results = results.filter(umkm =>
                umkm.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                umkm.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Filter by category
        if (selectedCategory) {
            results = results.filter(umkm => umkm.category === selectedCategory);
        }

        // Sort results
        results = [...results].sort((a, b) => {
            if (sortBy === 'rating') return b.avg_rating - a.avg_rating;
            if (sortBy === 'reviews') return b.review_count - a.review_count;
            if (sortBy === 'name') return a.name.localeCompare(b.name);
            return 0;
        });

        setFilteredUMKM(results);
    }, [searchTerm, selectedCategory, sortBy, umkmList]);

    const categories = [...new Set(umkmList.map(umkm => umkm.category))];

    if (loading) {
        return (
            <div className={styles.loading}>
                <div className={styles.spinner}></div>
                <p>Memuat data UMKM...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.error}>
                <p>{error}</p>
                <button onClick={() => window.location.reload()} className="btn btn-primary">
                    Coba Lagi
                </button>
            </div>
        );
    }

    return (
        <div className={styles.umkmList}>
            <div className={styles.container}>
                <h1 className={styles.title}>UMKM Terdekat</h1>

                {/* Search and Filter Section */}
                <div className={styles.controls}>
                    <div className={styles.searchBox}>

                        <input
                            type="text"
                            placeholder="Cari UMKM..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className={styles.searchInput}
                        />
                    </div>

                    <div className={styles.filters}>
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className={styles.filterSelect}
                        >
                            <option value="">Semua Kategori</option>
                            {categories.map(category => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>

                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className={styles.filterSelect}
                        >
                            <option value="rating">Rating Tertinggi</option>
                            <option value="reviews">Ulasan Terbanyak</option>
                            <option value="name">Nama A-Z</option>
                        </select>
                    </div>
                </div>

                {/* Results Count */}
                <div className={styles.resultsInfo}>
                    <p>Menampilkan {filteredUMKM.length} UMKM</p>
                </div>

                {/* UMKM Grid */}
                <div className={styles.umkmGrid}>
                    {filteredUMKM.map(umkm => (
                        <div key={umkm.id} className={styles.umkmCard}>
                            <div className={styles.imageContainer}>
                                {umkm.image_path ? (
                                    <img
                                        src={`https://kawan-umkm-backend-production.up.railway.app/api/uploads/images/${umkm.image_path}`}
                                        alt={umkm.name}
                                        className={styles.umkmImage}
                                        onError={(e) => {
                                            e.target.src = '/images/placeholder-umkm.jpg';
                                        }}
                                    />
                                ) : (
                                    <div className={styles.imagePlaceholder}>
                                        🏪
                                    </div>
                                )}
                                <span className={styles.categoryBadge}>{umkm.category}</span>
                            </div>

                            <div className={styles.umkmContent}>
                                <h3 className={styles.umkmName}>{umkm.name}</h3>
                                <p className={styles.umkmDescription}>{umkm.description}</p>

                                <div className={styles.umkmMeta}>
                                    <div className={styles.rating}>
                                        <span className={styles.stars}>
                                            {'⭐'.repeat(Math.round(umkm.avg_rating || 0))}
                                        </span>
                                        <span className={styles.ratingText}>
                                            {umkm.avg_rating ? umkm.avg_rating.toFixed(1) : '0.0'} ({umkm.review_count || 0} ulasan)
                                        </span>
                                    </div>

                                    {umkm.address && (
                                        <div className={styles.location}>
                                            <span>📍 {umkm.address}</span>
                                        </div>
                                    )}
                                </div>

                                <div className={styles.actions}>
                                    <Link to={`/umkm/${umkm.id}`} className={styles.detailButton}>
                                        Lihat Detail
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredUMKM.length === 0 && (
                    <div className={styles.noResults}>
                        <h3>Tidak ada UMKM yang ditemukan</h3>
                        <p>Coba ubah pencarian atau filter Anda</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UMKMList;