import { useEffect, useRef } from 'react';

const useAnimateOnScroll = () => {
    const observerRef = useRef(null);

    useEffect(() => {
        if (document.querySelector('.fadeIn')) {
            return;
        }

        const observerOptions = {
            threshold: 0.15,
            rootMargin: '50px 0px 50px 0px'
        };

        observerRef.current = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observerRef.current.unobserve(entry.target);
                }
            });
        }, observerOptions);

        const animatedElements = document.querySelectorAll('.scroll-animate');
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            el.style.willChange = 'transform, opacity';
            observerRef.current.observe(el);
        });

        return () => {
            if (observerRef.current) {
                animatedElements.forEach(el => observerRef.current.unobserve(el));
            }
        };
    }, []);
};

export default useAnimateOnScroll;