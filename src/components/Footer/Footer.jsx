import React, { useState } from 'react'; // Import useState
import { Link } from 'react-router-dom';
import FadeIn from '../FadeIn/FadeIn';
import styles from './Footer.module.css';

const Footer = () => {
    const [copySuccess, setCopySuccess] = useState('');

    const handleCopy = async (text, type) => {
        try {
            await navigator.clipboard.writeText(text.replace(/[^\d+@a-zA-Z.]/g, ''));
            setCopySuccess(`${type} berhasil disalin!`);
            setTimeout(() => setCopySuccess(''), 2000);
        } catch (err) {
            console.error('Gagal menyalin teks: ', err);
            setCopySuccess('Gagal menyalin teks');
            setTimeout(() => setCopySuccess(''), 2000);
        }
    };

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
                            {copySuccess && (
                                <div className={styles.copySuccess}>
                                    {copySuccess}
                                </div>
                            )}
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
                                <button 
                                    className={styles.contactItem}
                                    onClick={() => handleCopy('sekawanpapat@gmail.com', 'Email')}
                                >
                                    📧 sekawanpapat@gmail.com
                                </button>
                                <button 
                                    className={styles.contactItem}
                                    onClick={() => handleCopy('081359237006', 'Nomor telepon')}
                                >
                                    📞 0813-5923-7006
                                </button>
                                <button 
                                    className={styles.contactItem}
                                    onClick={() => handleCopy('+6281359237006', 'Nomor WhatsApp')}
                                >
                                    📱 +62 813-5923-7006
                                </button>
                                <p className={styles.contactItem}>📍 UPN Veteran Jawa Timur</p>
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