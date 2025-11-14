import React from 'react';
import styles from './BackgroundElements.module.css';

const BackgroundElements = () => {
    return (
        <div className={styles.bgElements}>
            <img src="/images/element/element1.png" alt="" className={`${styles.bgElement} ${styles.element1}`} />
            <img src="/images/element/element2.png" alt="" className={`${styles.bgElement} ${styles.element2}`} />
            <img src="/images/element/element3.png" alt="" className={`${styles.bgElement} ${styles.element3}`} />
            <img src="/images/element/element4.png" alt="" className={`${styles.bgElement} ${styles.element4}`} />
        </div>
    );
};

export default BackgroundElements;