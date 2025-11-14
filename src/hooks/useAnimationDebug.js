import { useEffect } from 'react';

export const useAnimationDebug = () => {
    useEffect(() => {
        if (process.env.NODE_ENV === 'development') {
            const style = document.createElement('style');
            style.textContent = `
                .fadeIn {
                    outline: 1px solid rgba(255, 0, 0, 0.3) !important;
                }
                .fadeIn.visible {
                    outline: 1px solid rgba(0, 255, 0, 0.3) !important;
                }
            `;
            document.head.appendChild(style);

            return () => {
                document.head.removeChild(style);
            };
        }
    }, []);
};