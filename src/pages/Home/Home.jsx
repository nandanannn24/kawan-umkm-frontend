import React from 'react';
import { Link } from 'react-router-dom';
import FadeIn from '../../components/FadeIn/FadeIn';
import useAnimateOnScroll from '../../hooks/useAnimateOnScroll';
import styles from './Home.module.css';

const Home = () => {
    useAnimateOnScroll();
    return (
        <div className={styles.home}>
            {/* Background Decorative Elements */}
            <div className={styles.bgElements}>
                <img src="/images/element/element1.png" alt="" className={`${styles.bgElement} ${styles.element1}`} />
                <img src="/images/element/element2.png" alt="" className={`${styles.bgElement} ${styles.element2}`} />
                <img src="/images/element/element3.png" alt="" className={`${styles.bgElement} ${styles.element3}`} />
                <img src="/images/element/element4.png" alt="" className={`${styles.bgElement} ${styles.element4}`} />
            </div>

            {/* Hero Section - Sesuai Gambar */}
            <section className={styles.hero}>
                <div className={styles.container}>
                    <div className={styles.heroContent}>
                        <div className={styles.logoSection}>
                            <div className={styles.logo}>
                                <img src="/images/logo.png" alt="Kawan UMKM Logo" className={styles.logoImage} />
                                <h1 className={styles.logoText}>KAWAN UMKM</h1>
                            </div>
                        </div>

                        <div className={styles.heroText}>
                            <h2 className={styles.heroSubtitle}>
                                Memajukan kesejahteraan UMKM
                            </h2>
                        </div>

                        <div className={styles.heroActions}>
                            <Link to="/umkm" className={styles.searchBar}>
                                <div className={styles.searchIconWrapper}>
                                    <img src="/images/search.png" alt="Search" className={styles.searchIcon} />
                                </div>
                                <span className={styles.searchText}>Temukan UMKM di sekitar anda</span>
                            </Link>
                            <p className={styles.registerPrompt}>
                                Punya usaha? <Link to="/register">Daftarkan UMKM Anda</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission Section - Dua Kartu Kiri Kanan */}
            <section className={styles.missionSection}>
                <div className={styles.container}>
                    <div className={styles.missionGrid}>
                        {/* Kartu Kiri - Komunitas Berkembang */}
                        <FadeIn direction="left" delay={100} className={styles.missionCardLeft}>
                            <div className={styles.cardContent}>
                                <h3 className={styles.missionTitle}>Komunitas Berkembang</h3>
                                <p className={styles.missionText}>
                                    Platform ini menjadi ruang bagi pelaku usaha, kreator, dan mitra bisnis
                                    untuk tumbuh bersama dan menciptakan inovasi yang berkelanjutan.
                                </p>
                            </div>
                            <div className={styles.cardDecoration}>
                                <div className={styles.decorationCircle}></div>
                            </div>
                        </FadeIn>

                        {/* Kartu Kanan - Digitalisasi UMKM */}
                        <FadeIn direction="right" delay={200} className={styles.missionCardRight}>
                            <div className={styles.cardContent}>
                                <h3 className={styles.missionTitle}>Digitalisasi UMKM</h3>
                                <p className={styles.missionText}>
                                    Kami membantu UMKM lokal beradaptasi dengan teknologi digital
                                    melalui promosi online, dan kolaborasi lintas sektor.
                                </p>
                            </div>
                            <div className={styles.cardDecoration}>
                                <div className={styles.decorationCircle}></div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* Gradient Text Box Section */}
            <section className={styles.gradientSection}>
                <div className={styles.container}>
                    <FadeIn direction="up" delay={300}>
                        <div className={styles.gradientBox}>
                            <h2 className={styles.gradientTitle}>Kolaborasi untuk Kemajuan Bersama</h2>
                            <p className={styles.gradientText}>
                                Bersama Kawan UMKM, mari kita wujudkan ekosistem bisnis yang inklusif dan berkelanjutan.
                                Setiap UMKM memiliki cerita unik, dan kami hadir untuk menjadikan setiap cerita tersebut
                                sebagai inspirasi bagi komunitas yang lebih luas.
                            </p>
                            <div className={styles.gradientStats}>
                                <div className={styles.statItem}>
                                    <span className={styles.statNumber}>500+</span>
                                    <span className={styles.statLabel}>UMKM Terdaftar</span>
                                </div>
                                <div className={styles.statItem}>
                                    <span className={styles.statNumber}>50+</span>
                                    <span className={styles.statLabel}>Kota Terjangkau</span>
                                </div>
                                <div className={styles.statItem}>
                                    <span className={styles.statNumber}>95%</span>
                                    <span className={styles.statLabel}>Kepuasan Pengguna</span>
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>
        </div>
    );
};

export default Home;