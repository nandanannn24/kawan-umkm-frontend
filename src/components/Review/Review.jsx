import React, { useState } from 'react';
import Rating from '../Rating/Rating';
import styles from './Review.module.css';

const Review = ({ reviews, onSubmitReview, canReview = true }) => {
    const [newReview, setNewReview] = useState({
        rating: 0,
        comment: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newReview.rating > 0) {
            onSubmitReview(newReview);
            setNewReview({ rating: 0, comment: '' });
        }
    };

    return (
        <div className={styles.reviewSection}>
            <h3>Ulasan dan Rating</h3>

            {/* Form ulasan */}
            {canReview && (
                <form onSubmit={handleSubmit} className={styles.reviewForm}>
                    <div className={styles.ratingInput}>
                        <label>Beri Rating:</label>
                        <Rating
                            rating={newReview.rating}
                            setRating={(rating) => setNewReview({ ...newReview, rating })}
                        />
                    </div>
                    <textarea
                        value={newReview.comment}
                        onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                        placeholder="Tulis ulasan Anda..."
                        className={styles.commentInput}
                        rows="3"
                    />
                    <button
                        type="submit"
                        className={styles.submitButton}
                        disabled={newReview.rating === 0}
                    >
                        Kirim Ulasan
                    </button>
                </form>
            )}

            {/* Daftar ulasan */}
            <div className={styles.reviewsList}>
                {reviews.map((review, index) => (
                    <div key={index} className={styles.reviewItem}>
                        <div className={styles.reviewHeader}>
                            <span className={styles.userName}>{review.userName}</span>
                            <Rating rating={review.rating} readOnly={true} />
                            <span className={styles.reviewDate}>{review.date}</span>
                        </div>
                        <p className={styles.reviewComment}>{review.comment}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Review;