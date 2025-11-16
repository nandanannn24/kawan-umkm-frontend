import React from 'react';
import styles from './UMKMCard.module.css';

const UMKMCard = ({ umkm }) => {
    // Function to handle image errors
    const handleImageError = (e) => {
        console.error(`❌ Failed to load image: ${umkm.image_url}`);
        e.target.src = '/images/placeholder-umkm.jpg'; // Fallback image
    };

    // Function to ensure correct image URL
    const getImageUrl = (imageUrl) => {
        if (!imageUrl) return '/images/placeholder-umkm.jpg';

        // If it's already a full URL, use it
        if (imageUrl.startsWith('http')) return imageUrl;

        // If it's a relative path, prepend backend URL
        if (imageUrl.startsWith('/uploads/')) {
            return `https://kawan-umkm-backend-production.up.railway.app${imageUrl}`;
        }

        return imageUrl;
    };

    return (
        <div className={styles.card}>
            <div className={styles.imageContainer}>
                <img
                    src={getImageUrl(umkm.image_url)}
                    alt={umkm.name}
                    className={styles.image}
                    onError={handleImageError}
                    loading="lazy"
                />
            </div>
            <div className={styles.content}>
                <h3 className={styles.name}>{umkm.name}</h3>
                <p className={styles.category}>{umkm.category}</p>
                <p className={styles.address}>{umkm.address}</p>
                <p className={styles.contact}>{umkm.contact}</p>
            </div>
        </div>
    );
};

export default UMKMCard;