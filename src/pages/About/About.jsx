import React from 'react';
import FadeIn from '../../components/FadeIn/FadeIn';
import styles from './About.module.css';

const About = () => {
    return (
        <div className={`${styles.about} ${styles.pageWithBg}`}>
            {/* Background Decorative Elements */}
            <div className={styles.bgElements}>
                <img src="/images/element/element1.png" alt="" className={`${styles.bgElement} ${styles.element1}`} />
                <img src="/images/element/element2.png" alt="" className={`${styles.bgElement} ${styles.element2}`} />
                <img src="/images/element/element3.png" alt="" className={`${styles.bgElement} ${styles.element3}`} />
                <img src="/images/element/element4.png" alt="" className={`${styles.bgElement} ${styles.element4}`} />
            </div>
            <div className={styles.container}>
                {/* Header */}
                <FadeIn as="header" direction="down" className={styles.header}>
                    <h1 className={styles.title}>
                        Tentang <span className={styles.highlight}>Kawan</span> UMKM
                    </h1>
                </FadeIn>

                {/* Visi Misi */}
                <FadeIn as="section" direction="up" className={styles.visionMission}>
                    <h2 className={styles.sectionTitle}>Visi dan Misi Kawan UMKM</h2>
                    <div className={styles.missionList}>
                        <div className={styles.missionItem}>
                            <h3>Misi</h3>
                            <ul>
                                <li>Menyediakan akses digital yang mudah dan terjangkau bagi UMKM tradisional</li>
                                <li>Membangun komunitas UMKM yang saling mendukung dan berkolaborasi</li>
                                <li>Meningkatkan visibilitas bisnis lokal melalui teknologi modern</li>
                                <li>Memberikan edukasi dan pelatihan digital marketing untuk UMKM</li>
                                <li>Menghubungkan konsumen dengan UMKM terdekat secara real-time</li>
                            </ul>
                        </div>
                    </div>
                </FadeIn>

                {/* Tim Pengembang */}
                <section className={styles.team}>
                    <FadeIn as="h2" direction="up" className={styles.sectionTitle}>Tim Pengembang</FadeIn>
                    <div className={styles.teamGrid}>
                        <FadeIn direction="up" delay={100} className={styles.teamMember}>
                            <img src="/images/element/element1.png" alt="" className={styles.memberBgElement} />
                            <div className={styles.memberImage}>
                                <img src="/images/team/priyoga.png" alt="Priyoga Listyo Ananda" />
                            </div>
                            <div className={styles.memberInfo}>
                                <h3>Priyoga Listyo Ananda</h3>
                                <p className={styles.role}>Full Stack Developer</p>
                                <p className={styles.description}>
                                    Mengelola arsitektur teknis secara menyeluruh. Mengembangkan sisi server
                                    (Back-End) yang mencakup database dan logika bisnis, sekaligus mengembangkan
                                    sisi klien (Front-End) dan mengintegrasikan keduanya.
                                </p>
                            </div>
                        </FadeIn>

                        <FadeIn direction="up" delay={200} className={styles.teamMember}>
                            <img src="/images/element/element2.png" alt="" className={styles.memberBgElement} />
                            <div className={styles.memberImage}>
                                <img src="/images/team/rifat.png" alt="Rifat Abhista" />
                            </div>
                            <div className={styles.memberInfo}>
                                <h3>Rifat Abhista</h3>
                                <p className={styles.role}>Frontend Developer</p>
                                <p className={styles.description}>
                                    Mengimplementasikan desain UI/UX menjadi kode interaktif. Fokus pada
                                    pengembangan sisi klien (Front-End), mengembangkan semua komponen visual
                                    dan fungsionalitas yang berinteraksi langsung dengan pengguna.
                                </p>
                            </div>
                        </FadeIn>

                        <FadeIn direction="up" delay={300} className={styles.teamMember}>
                            <img src="/images/element/element3.png" alt="" className={styles.memberBgElement} />
                            <div className={styles.memberImage}>
                                <img src="/images/team/firzan.png" alt="Firzan Syaroni" />
                            </div>
                            <div className={styles.memberInfo}>
                                <h3>Firzan Syaroni</h3>
                                <p className={styles.role}>UI/UX Designer</p>
                                <p className={styles.description}>
                                    Bertanggung jawab atas perancangan produk. Merancang alur interaksi
                                    pengguna (UX) dan mengembangkan desain antarmuka visual (UI) yang
                                    menjadi acuan utama pengembangan.
                                </p>
                            </div>
                        </FadeIn>
                    </div>
                </section>

                {/* Filosofi Logo */}
                <FadeIn as="section" direction="up" className={styles.logoPhilosophy}>
                    <h2 className={styles.sectionTitle}>Filosofi Logo</h2>
                    <div className={styles.philosophyGrid}>
                        <FadeIn as="div" direction="right" className={styles.logoDisplay}>
                            <img src="/images/logo.png" alt="Filosofi Logo Kawan UMKM" className={styles.logoImage} />
                        </FadeIn>
                        <div className={styles.philosophyTextGrid}>
                            <FadeIn direction="left" delay={100} className={styles.philosophyItem}>
                                <img src="/images/circle.png" alt="Bentuk Lingkaran" className={styles.philosophyIcon} />
                                <h4>Bentuk Lingkaran</h4>
                                <p>Melambangkan kesatuan, ekosistem berkelanjutan, dan konektivitas tanpa batas antara UMKM dengan masyarakat.</p>
                            </FadeIn>
                            <FadeIn direction="left" delay={200} className={styles.philosophyItem}>
                                <img src="/images/purple.png" alt="Warna Ungu" className={styles.philosophyIcon} />
                                <h4>Warna Ungu</h4>
                                <p>Mencerminkan inovasi, kreativitas, kualitas premium, dan pandangan futuristik terhadap digitalisasi UMKM lokal.</p>
                            </FadeIn>
                            <FadeIn direction="left" delay={300} className={styles.philosophyItem}>
                                <img src="/images/three-elements.png" alt="Tiga Elemen Sentral" className={styles.philosophyIcon} />
                                <h4>Tiga Elemen Sentral</h4>
                                <p>Merepresentasikan kolaborasi sinergia antara UMKM, teknologi digital, dan komunitas. Angka tiga juga secara halus mengisyaratkan tiga pendiri tim, sementara "Papat" mewakili komunitas UMKM yang luas yang mereka layani.</p>
                            </FadeIn>
                            <FadeIn direction="left" delay={400} className={styles.philosophyItem}>
                                <img src="/images/text-circle.png" alt="Teks dalam Lingkaran" className={styles.philosophyIcon} />
                                <h4>Teks dalam Lingkaran</h4>
                                <p>Menunjukkan komitmen penuh dan dedikasi tim sebagai bagian integral dari misi memberdayakan UMKM lokal secara berkelanjutan.</p>
                            </FadeIn>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </div>
    );
};

export default About;