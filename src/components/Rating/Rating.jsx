import React, { useState } from 'react';
import styles from './Rating.module.css';

const Rating = ({
    rating = 0,
    onRatingChange,
    readOnly = false,
    size = 'medium',
    showLabel = false,
    showValue = false
}) => {
    const [hoverRating, setHoverRating] = useState(0);

    const handleRatingClick = (newRating) => {
        if (!readOnly && onRatingChange) {
            onRatingChange(newRating);
        }
    };

    const handleMouseEnter = (starIndex) => {
        if (!readOnly) {
            setHoverRating(starIndex);
        }
    };

    const handleMouseLeave = () => {
        if (!readOnly) {
            setHoverRating(0);
        }
    };

    const displayRating = hoverRating || rating;

    return (
        <div className={`${styles.ratingContainer} ${styles[size]} ${readOnly ? styles.readOnly : ''}`}>
            <div className={styles.stars}>
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        type="button"
                        className={`${styles.star} ${star <= displayRating ? styles.filled : styles.empty}`}
                        onClick={() => handleRatingClick(star)}
                        onMouseEnter={() => handleMouseEnter(star)}
                        onMouseLeave={handleMouseLeave}
                        disabled={readOnly}
                        aria-label={`Rate ${star} out of 5 stars`}
                    >
                        <span className={styles.starIcon}>★</span>
                    </button>
                ))}
            </div>

            {(showLabel || showValue) && (
                <div className={styles.ratingInfo}>
                    {showLabel && !readOnly && (
                        <span className={styles.ratingLabel}>
                            {displayRating > 0 ? `Pilih: ${displayRating}/5` : 'Pilih rating'}
                        </span>
                    )}
                    {showValue && readOnly && rating > 0 && (
                        <span className={styles.ratingValue}>
                            {rating.toFixed(1)}
                        </span>
                    )}
                </div>
            )}
        </div>
    );
};

export default Rating;