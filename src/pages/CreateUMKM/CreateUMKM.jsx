import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { umkmAPI } from '../../services/api'; // IMPORT INI
import styles from './CreateUMKM.module.css';

const CreateUMKM = () => {
    const { user, token } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const [formData, setFormData] = useState({
        name: '',
        category: '',
        description: '',
        address: '',
        phone: '',
        hours: '',
        latitude: '',
        longitude: ''
    });
    const [image, setImage] = useState(null);

    useEffect(() => {
        console.log('🔍 CreateUMKM Debug Info:');
        console.log('User:', user);
        console.log('Token exists:', !!token);
        console.log('User role:', user?.role);
    }, [user, token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        console.log('🔄 Submitting UMKM form...');
        console.log('Form data:', formData);
        console.log('Image:', image);

        const submitData = new FormData();
        Object.keys(formData).forEach(key => {
            if (formData[key]) {
                submitData.append(key, formData[key]);
            }
        });

        if (image) {
            submitData.append('image', image);
        }

        try {
            // GUNAKAN umkmAPI.create() BUKAN fetch langsung
            console.log('📤 Sending UMKM data via umkmAPI...');
            const response = await umkmAPI.create(submitData);

            console.log('✅ UMKM created successfully:', response.data);
            setMessage({ type: 'success', text: 'UMKM berhasil dibuat!' });
            setTimeout(() => navigate('/umkm'), 2000);

        } catch (error) {
            console.error('🔥 Create UMKM error:', error);
            const errorMessage = error.response?.data?.error || 'Terjadi kesalahan saat membuat UMKM';
            setMessage({ type: 'error', text: errorMessage });
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    // Check if user has permission
    if (user && user.role !== 'umkm' && user.role !== 'admin') {
        return (
            <div className={styles.container}>
                <div className={styles.errorContainer}>
                    <h2>❌ Akses Ditolak</h2>
                    <p>Hanya pemilik UMKM dan admin yang dapat menambah UMKM.</p>
                    <p>Role Anda: <strong>{user.role}</strong></p>
                    <button
                        onClick={() => navigate('/')}
                        className={styles.backButton}
                    >
                        Kembali ke Beranda
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.pageContainer}>
            <div className={styles.container}>
                <div className={styles.formWrapper}>
                    <h1 className={styles.title}>Tambah UMKM Baru</h1>

                    {message.text && (
                        <div className={message.type === 'success' ? styles.successMessage : styles.errorMessage}>
                            {message.text}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.formGrid}>
                            <div className={styles.formGroup}>
                                <label htmlFor="name">Nama UMKM *</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="Masukkan nama UMKM"
                                    className={styles.input}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="category">Kategori *</label>
                                <select
                                    id="category"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    required
                                    className={styles.input}
                                >
                                    <option value="">Pilih Kategori</option>
                                    <option value="makanan">Makanan & Minuman</option>
                                    <option value="fashion">Fashion</option>
                                    <option value="kerajinan">Kerajinan</option>
                                    <option value="jasa">Jasa</option>
                                    <option value="retail">Retail</option>
                                    <option value="other">Lainnya</option>
                                </select>
                            </div>

                            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                                <label htmlFor="description">Deskripsi</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows="4"
                                    placeholder="Deskripsikan UMKM Anda..."
                                    className={styles.textarea}
                                />
                            </div>

                            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                                <label htmlFor="address">Alamat *</label>
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    required
                                    placeholder="Masukkan alamat lengkap"
                                    className={styles.input}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="phone">Nomor Telepon</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Contoh: 081234567890"
                                    className={styles.input}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="hours">Jam Operasional</label>
                                <input
                                    type="text"
                                    id="hours"
                                    name="hours"
                                    value={formData.hours}
                                    onChange={handleChange}
                                    placeholder="Contoh: 08:00 - 17:00"
                                    className={styles.input}
                                />
                            </div>

                            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                                <label htmlFor="image">Gambar UMKM</label>
                                <input
                                    type="file"
                                    id="image"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className={styles.fileInput}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="latitude">Latitude (Opsional)</label>
                                <input
                                    type="text"
                                    id="latitude"
                                    name="latitude"
                                    value={formData.latitude}
                                    onChange={handleChange}
                                    placeholder="Koordinat latitude"
                                    className={styles.input}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="longitude">Longitude (Opsional)</label>
                                <input
                                    type="text"
                                    id="longitude"
                                    name="longitude"
                                    value={formData.longitude}
                                    onChange={handleChange}
                                    placeholder="Koordinat longitude"
                                    className={styles.input}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className={styles.submitButton}
                            disabled={loading}
                        >
                            {loading ? '⏳ Membuat UMKM...' : '🚀 Buat UMKM'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateUMKM;