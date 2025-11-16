import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import styles from './Header.module.css';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('/');
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const indicatorRef = useRef(null);
    const navRef = useRef(null);
    const menuButtonRef = useRef(null);

    useEffect(() => {
        setActiveTab(location.pathname);
    }, [location.pathname]);

    useEffect(() => {
        const updateIndicator = () => {
            if (indicatorRef.current && navRef.current) {
                const activeLink = navRef.current.querySelector(`[data-path="${activeTab}"]`);
                if (activeLink) {
                    const { offsetLeft, offsetWidth } = activeLink;
                    indicatorRef.current.style.transform = `translateX(${offsetLeft}px)`;
                    indicatorRef.current.style.width = `${offsetWidth}px`;
                }
            }
        };

        updateIndicator();
        window.addEventListener('resize', updateIndicator);
        return () => window.removeEventListener('resize', updateIndicator);
    }, [activeTab]);

    // 🔥 FIX: Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMenuOpen]);

    const handleLogout = () => {
        logout();
        navigate('/');
        setIsMenuOpen(false); // 🔥 FIX: Close menu on logout
    };

    const handleNavClick = (path) => {
        setActiveTab(path);
        setIsMenuOpen(false);
    };

    // 🔥 FIX: Improved menu toggle with animation
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // 🔥 FIX: Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isMenuOpen &&
                !event.target.closest(`.${styles.mobileMenu}`) &&
                !event.target.closest(`.${styles.menuButton}`)) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMenuOpen]);

    const isActive = (path) => activeTab === path;

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.logo}>
                    <Link to="/" onClick={() => handleNavClick('/')}>
                        <img src="/images/logo.png" alt="Kawan UMKM" className={styles.headerLogoImage} />
                        <span className={styles.logoText}>KAWAN UMKM</span>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className={styles.nav} ref={navRef}>
                    <ul className={styles.navList}>
                        <li>
                            <Link
                                to="/"
                                className={`${styles.navLink} ${isActive('/') ? styles.active : ''}`}
                                data-path="/"
                                onClick={() => handleNavClick('/')}
                            >
                                Beranda
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/umkm"
                                className={`${styles.navLink} ${isActive('/umkm') ? styles.active : ''}`}
                                data-path="/umkm"
                                onClick={() => handleNavClick('/umkm')}
                            >
                                UMKM Terdekat
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/about"
                                className={`${styles.navLink} ${isActive('/about') ? styles.active : ''}`}
                                data-path="/about"
                                onClick={() => handleNavClick('/about')}
                            >
                                Tentang
                            </Link>
                        </li>
                        {/* Tambahan untuk UMKM Owner */}
                        {user && (user.role === 'umkm' || user.role === 'admin') && (
                            <li>
                                <Link
                                    to="/create-umkm"
                                    className={`${styles.navLink} ${isActive('/create-umkm') ? styles.active : ''}`}
                                    data-path="/create-umkm"
                                    onClick={() => handleNavClick('/create-umkm')}
                                >
                                    + Tambah UMKM
                                </Link>
                            </li>
                        )}
                    </ul>

                    {/* Active Indicator */}
                    <div ref={indicatorRef} className={styles.activeIndicator}></div>
                </nav>

                {/* Auth Section */}
                <div className={styles.authSection}>
                    {user ? (
                        <div className={styles.userMenu}>
                            <span className={styles.userName}>Halo, {user.name}</span>
                            <div className={styles.dropdown}>
                                <Link to="/dashboard" className={styles.dropdownItem}>Dashboard</Link>
                                <Link to="/profile" className={styles.dropdownItem}>Profile</Link>
                                {user.role === 'admin' && (
                                    <Link to="/dashboard/admin" className={styles.dropdownItem}>Admin Panel</Link>
                                )}
                                <button onClick={handleLogout} className={styles.dropdownItem}>
                                    Logout
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className={styles.authButtons}>
                            <Link to="/login" className={`btn btn-secondary ${styles.loginBtn}`}>
                                Log In
                            </Link>
                            <Link to="/register" className={`btn btn-primary ${styles.registerBtn}`}>
                                Daftar
                            </Link>
                        </div>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    ref={menuButtonRef}
                    className={styles.menuButton}
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    <span style={{ transform: isMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }}></span>
                    <span style={{ opacity: isMenuOpen ? 0 : 1 }}></span>
                    <span style={{ transform: isMenuOpen ? 'rotate(-45deg) translate(7px, -6px)' : 'none' }}></span>
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.mobileMenuOpen : ''}`}>
                <nav className={styles.mobileNav}>
                    <Link
                        to="/"
                        className={isActive('/') ? styles.mobileActive : ''}
                        onClick={() => handleNavClick('/')}
                    >
                        Beranda
                    </Link>
                    <Link
                        to="/umkm"
                        className={isActive('/umkm') ? styles.mobileActive : ''}
                        onClick={() => handleNavClick('/umkm')}
                    >
                        UMKM Terdekat
                    </Link>
                    <Link
                        to="/about"
                        className={isActive('/about') ? styles.mobileActive : ''}
                        onClick={() => handleNavClick('/about')}
                    >
                        Tentang
                    </Link>

                    {user ? (
                        <>
                            <Link to="/dashboard" onClick={() => handleNavClick('/dashboard')}>Dashboard</Link>
                            <Link to="/profile" onClick={() => handleNavClick('/profile')}>Profile</Link>
                            {(user.role === 'umkm' || user.role === 'admin') && (
                                <Link to="/create-umkm" onClick={() => handleNavClick('/create-umkm')}>+ Tambah UMKM</Link>
                            )}
                            {user.role === 'admin' && (
                                <Link to="/dashboard/admin" onClick={() => handleNavClick('/dashboard/admin')}>Admin Panel</Link>
                            )}
                            <button onClick={handleLogout}>Logout</button>
                        </>
                    ) : (
                        <div className={styles.mobileAuth}>
                            <Link to="/login" className="btn btn-secondary" onClick={() => handleNavClick('/login')}>
                                Log In
                            </Link>
                            <Link to="/register" className="btn btn-primary" onClick={() => handleNavClick('/register')}>
                                Daftar
                            </Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;