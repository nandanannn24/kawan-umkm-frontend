import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import FadeIn from '../../components/FadeIn/FadeIn';
import styles from './AdminPanel.module.css';

const AdminPanel = () => {
    const { user } = useAuth();

    return (
        <div className={`${styles.adminPanel} ${styles.pageWithBg}`}>
            {/* Background Decorative Elements */}
            <div className={styles.bgElements}>
                <img src="/images/element/element1.png" alt="" className={`${styles.bgElement} ${styles.element1}`} />
                <img src="/images/element/element2.png" alt="" className={`${styles.bgElement} ${styles.element2}`} />
                <img src="/images/element/element3.png" alt="" className={`${styles.bgElement} ${styles.element3}`} />
                <img src="/images/element/element4.png" alt="" className={`${styles.bgElement} ${styles.element4}`} />
            </div>

            <div className={styles.container}>
                <FadeIn as="h1" direction="down" className={styles.title}>Admin Panel</FadeIn>
                <FadeIn as="p" direction="down" delay={100} className={styles.subtitle}>Selamat datang, {user?.name}</FadeIn>

                <div className={styles.adminGrid}>
                    <FadeIn direction="up" delay={200} className={styles.adminCard}>
                        <h3>Manajemen UMKM</h3>
                        <p>Kelola semua UMKM yang terdaftar</p>
                        <button className="btn btn-primary">Kelola UMKM</button>
                    </FadeIn>

                    <FadeIn direction="up" delay={300} className={styles.adminCard}>
                        <h3>Manajemen User</h3>
                        <p>Kelola semua pengguna sistem</p>
                        <button className="btn btn-primary">Kelola User</button>
                    </FadeIn>

                    <FadeIn direction="up" delay={400} className={styles.adminCard}>
                        <h3>Laporan Sistem</h3>
                        <p>Lihat laporan dan statistik</p>
                        <button className="btn btn-primary">Lihat Laporan</button>
                    </FadeIn>

                    <FadeIn direction="up" delay={500} className={styles.adminCard}>
                        <h3>Pengaturan Sistem</h3>
                        <p>Konfigurasi sistem aplikasi</p>
                        <button className="btn btn-primary">Pengaturan</button>
                    </FadeIn>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;