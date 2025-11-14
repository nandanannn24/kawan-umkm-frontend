import { useEffect, useRef } from 'react';

export const useStrictAnimation = (enabled = true) => {
    useEffect(() => {
        if (!enabled) return;

        const style = document.createElement('style');
        style.textContent = `
            * {
                transform: translateZ(0);
                backface-visibility: hidden;
                perspective: 1000px;
            }
            
            .fadeIn {
                transform-style: preserve-3d;
            }
        `;
        document.head.appendChild(style);

        return () => {
            document.head.removeChild(style);
        };
    }, [enabled]);
};

export const useFlickerDebug = (componentName = 'Unknown') => {
    const ref = useRef(null);

    useEffect(() => {
        if (!ref.current) return;

        const element = ref.current;
        let flickerCount = 0;

        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class') {
                    const hasVisible = element.classList.contains('visible');
                    console.log(`🔄 ${componentName}:`, {
                        visible: hasVisible,
                        flickerCount: ++flickerCount
                    });
                }
            });
        });

        observer.observe(element, {
            attributes: true,
            attributeFilter: ['class']
        });

        return () => observer.disconnect();
    }, [componentName]);

    return ref;
};