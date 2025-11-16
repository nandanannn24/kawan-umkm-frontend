import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { umkmAPI } from '../../services/api';
import styles from './CreateUMKM.module.css';

const CreateUMKM = () => {
    const { user, token } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    // FIXED: Changed 'phone' to 'contact' to match backend
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        description: '',
        address: '',
        contact: '', // Changed from 'phone' to 'contact'
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

        // Validate form
        if (!formData.name || !formData.category || !formData.address || !formData.contact) {
            setMessage({ type: 'error', text: 'Harap isi semua field yang wajib diisi!' });
            return;
        }

        if (!image) {
            setMessage({ type: 'error', text: 'Harap pilih gambar UMKM!' });
            return;
        }

        setLoading(true);
        setMessage({ type: '', text: '' });

        console.log('🔄 Submitting UMKM form...');
        console.log('Form data:', formData);
        console.log('Image:', image);

        try {
            const submitData = new FormData();

            // Append form data with CORRECT field names
            submitData.append('name', formData.name);
            submitData.append('category', formData.category);
            submitData.append('description', formData.description || '');
            submitData.append('address', formData.address);
            submitData.append('contact', formData.contact); // Correct field name
            submitData.append('latitude', formData.latitude || '');
            submitData.append('longitude', formData.longitude || '');

            // Append image
            submitData.append('image', image);

            console.log('📤 Sending UMKM data via umkmAPI...');

            // Debug: Log FormData contents
            for (let [key, value] of submitData.entries()) {
                console.log(`FormData: ${key} =`, value);
            }

            const response = await umkmAPI.create(submitData);

            console.log('✅ UMKM created successfully:', response.data);
            setMessage({ type: 'success', text: 'UMKM berhasil dibuat!' });

            // Reset form
            setFormData({
                name: '',
                category: '',
                description: '',
                address: '',
                contact: '',
                latitude: '',
                longitude: ''
            });
            setImage(null);

            // Redirect after 2 seconds
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
        const file = e.target.files[0];
        if (file) {
            // Basic image validation
            const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
            if (!validTypes.includes(file.type)) {
                setMessage({ type: 'error', text: 'Format file tidak didukung. Gunakan JPG, PNG, GIF, atau WebP.' });
                return;
            }

            if (file.size > 5 * 1024 * 1024) {
                setMessage({ type: 'error', text: 'Ukuran file terlalu besar. Maksimal 5MB.' });
                return;
            }

            setImage(file);
            setMessage({ type: '', text: '' });
        }
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

                            {/* FIXED: Changed from 'phone' to 'contact' */}
                            <div className={styles.formGroup}>
                                <label htmlFor="contact">Nomor Telepon *</label>
                                <input
                                    type="tel"
                                    id="contact"
                                    name="contact"
                                    value={formData.contact}
                                    onChange={handleChange}
                                    required
                                    placeholder="Contoh: 081234567890"
                                    className={styles.input}
                                />
                            </div>

                            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                                <label htmlFor="image">Gambar UMKM *</label>
                                <input
                                    type="file"
                                    id="image"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    required
                                    className={styles.fileInput}
                                />
                                <small className={styles.helperText}>
                                    Format: JPG, PNG, GIF, WebP (maksimal 5MB)
                                </small>
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