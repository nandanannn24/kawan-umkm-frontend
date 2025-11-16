// Utility functions for handling images
export const getImageUrl = (imageUrl) => {
    if (!imageUrl) {
        return '/images/placeholder-umkm.jpg';
    }

    // If it's already a full URL, return as is
    if (imageUrl.startsWith('http')) {
        return imageUrl;
    }

    // If it's a relative path from backend, prepend backend URL
    if (imageUrl.startsWith('/uploads/')) {
        return `https://kawan-umkm-backend-production.up.railway.app${imageUrl}`;
    }

    // If it's just a filename, assume it's in uploads/images
    if (imageUrl.includes('.')) {
        return `https://kawan-umkm-backend-production.up.railway.app/uploads/images/${imageUrl}`;
    }

    return '/images/placeholder-umkm.jpg';
};

export const handleImageError = (e, fallback = '/images/placeholder-umkm.jpg') => {
    console.warn('🖼️ Image failed to load, using fallback');
    e.target.src = fallback;
};

export const validateImageFile = (file) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.type)) {
        return { valid: false, error: 'File type not allowed. Use JPEG, PNG, GIF, or WebP.' };
    }

    if (file.size > maxSize) {
        return { valid: false, error: 'File too large. Maximum size is 5MB.' };
    }

    return { valid: true, error: null };
};