import React from 'react';
import { Link } from 'react-router-dom';
import FadeIn from '../FadeIn/FadeIn';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <FadeIn direction="up" delay={100}>
                    <div className={styles.footerContent}>
                        <div className={styles.footerSection}>
                            <div className={styles.logo}>
                                <img src="/images/logo.png" alt="Kawan UMKM" className={styles.footerLogoImage} />
                                <span className={styles.logoText}>KAWAN UMKM</span>
                            </div>
                            <p className={styles.footerDescription}>
                                Memajukan kesejahteraan UMKM melalui digitalisasi dan kolaborasi.
                            </p>
                        </div>

                        <div className={styles.footerSection}>
                            <h4 className={styles.sectionTitle}>Navigasi</h4>
                            <div className={styles.footerLinks}>
                                <Link to="/" className={styles.footerLink}>Beranda</Link>
                                <Link to="/umkm" className={styles.footerLink}>UMKM Terdekat</Link>
                                <Link to="/about" className={styles.footerLink}>Tentang Kami</Link>
                                <Link to="/contact" className={styles.footerLink}>Kontak</Link>
                            </div>
                        </div>

                        <div className={styles.footerSection}>
                            <h4 className={styles.sectionTitle}>Kontak</h4>
                            <div className={styles.contactInfo}>
                                <p>📧 sekawanpapat@gmail.com</p>
                                <p>📞 0813-5923-7006</p>
                                <p>📱 +62 813-5923-7006</p>
                                <p>📍 UPN Veteran Jawa Timur</p>
                            </div>
                        </div>
                    </div>
                </FadeIn>

                <FadeIn direction="up" delay={200}>
                    <div className={styles.footerBottom}>
                        <p>&copy; 2025 Kawan UMKM. All rights reserved.</p>
                    </div>
                </FadeIn>
            </div>
        </footer>
    );
};

export default Footer;