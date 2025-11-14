import React, { useEffect, useRef, useState, useCallback } from 'react';
import styles from './FadeIn.module.css';

const FadeIn = ({
    children,
    direction = 'up',
    delay = 0,
    className = '',
    scrollAnimation = true,
    threshold = 0.3,
    rootMargin = '150px', 
    triggerOnce = true
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [hasTriggered, setHasTriggered] = useState(false);
    const ref = useRef(null);
    const observerRef = useRef(null);

    const directionClass = styles[direction] || styles.up;
    const cleanupObserver = useCallback(() => {
        if (observerRef.current && ref.current) {
            observerRef.current.unobserve(ref.current);
            observerRef.current.disconnect();
        }
    }, []);

    const handleIntersection = useCallback(([entry]) => {
        if (!entry.isIntersecting) return;

        if (triggerOnce && hasTriggered) return;

        requestAnimationFrame(() => {
            setIsVisible(true);
            setHasTriggered(true);

            if (triggerOnce) {
                cleanupObserver();
            }
        });
    }, [triggerOnce, hasTriggered, cleanupObserver]);

    useEffect(() => {
        if (!scrollAnimation) {
            setIsVisible(true);
            return;
        }

        const initTimeout = setTimeout(() => {
            if (!ref.current) return;

            const options = {
                threshold: threshold,
                rootMargin: rootMargin,
                trackVisibility: true,
                delay: 100
            };

            observerRef.current = new IntersectionObserver(handleIntersection, options);
            observerRef.current.observe(ref.current);
        }, 50);

        return () => {
            clearTimeout(initTimeout);
            cleanupObserver();
        };
    }, [scrollAnimation, threshold, rootMargin, handleIntersection, cleanupObserver]);

    const delayStyle = {
        animationDelay: `${delay}ms`,
        WebkitAnimationDelay: `${delay}ms`
    };

    const combinedClass = `${styles.fadeIn} ${directionClass} ${isVisible ? styles.visible : ''} ${className}`.trim();

    return (
        <div
            ref={ref}
            className={combinedClass}
            style={delayStyle}
            data-visible={isVisible}
            data-direction={direction}
        >
            {children}
        </div>
    );
};

export default FadeIn;