import React, { useState } from 'react';
import styles from './PasswordInput.module.css';

const PasswordInput = ({
    value,
    onChange,
    placeholder,
    required = false,
    disabled = false,
    id,
    name,
    className = '',
    size = 'medium', // 'small', 'medium', 'large'
    variant = 'default' // 'default', 'bordered'
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleKeyDown = (e) => {
        // Allow toggle with Space or Enter when button is focused
        if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            togglePasswordVisibility();
        }
    };

    return (
        <div className={`${styles.passwordContainer} ${styles[size]} ${styles[variant]} ${className}`}>
            <input
                type={showPassword ? 'text' : 'password'}
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                disabled={disabled}
                className={styles.passwordInput}
                aria-describedby={`${id}-description`}
            />
            <button
                type="button"
                onClick={togglePasswordVisibility}
                onKeyDown={handleKeyDown}
                className={styles.toggleButton}
                disabled={disabled}
                tabIndex={0} // Allow focus for accessibility
                aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                aria-controls={id}
            >
                {showPassword ? (
                    <span className={styles.eyeIcon} role="img" aria-label="visible">👁️</span>
                ) : (
                    <span className={styles.eyeIcon} role="img" aria-label="hidden">👁️‍🗨️</span>
                )}
            </button>

            {/* Accessibility description */}
            <span id={`${id}-description`} className="sr-only">
                {showPassword ? "Password sedang ditampilkan" : "Password sedang disembunyikan"}
            </span>
        </div>
    );
};

export default PasswordInput;