import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import BackgroundElements from './components/BackgroundElements/BackgroundElements';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import Home from './pages/Home/Home';
import UMKMList from './pages/UMKMList/UMKMList';
import UMKMDetail from './pages/UMKMDetail/UMKMDetail';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import Dashboard from './pages/Dashboard/Dashboard';
import CreateUMKM from './pages/CreateUMKM/CreateUMKM';
import About from './pages/About/About';
import Profile from './pages/Profile/Profile';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import AdminDashboard from './pages/Admin/AdminDashboard';
import UMKMDashboard from './pages/Dashboard/UMKMDashboard';
import UserDashboard from './pages/Dashboard/UserDashboard';
import './styles/globals.css';


function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="app">
                    <ScrollToTop />
                    <BackgroundElements />
                    <Header />
                    <main className="main-content">
                        <Routes>
                            {/* Public Routes */}
                            <Route path="/" element={<Home />} />
                            <Route path="/umkm" element={<UMKMList />} />
                            <Route path="/umkm/:id" element={<UMKMDetail />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/reset-password" element={<ResetPassword />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/forgot-password" element={<ForgotPassword />} />

                            {/* Protected Routes - Role Specific */}
                            <Route
                                path="/dashboard/admin"
                                element={
                                    <ProtectedRoute requiredRole="admin">
                                        <AdminDashboard />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/dashboard/umkm"
                                element={
                                    <ProtectedRoute requiredRole="umkm">
                                        <UMKMDashboard />
                                    </ProtectedRoute>
                                }
                            />

                            {/* Protected Routes - General */}
                            <Route
                                path="/dashboard"
                                element={
                                    <ProtectedRoute>
                                        <Dashboard />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/dashboard/user"
                                element={
                                    <ProtectedRoute>
                                        <UserDashboard />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/create-umkm"
                                element={
                                    <ProtectedRoute requiredRole={['umkm', 'admin']}>
                                        <CreateUMKM />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/profile"
                                element={
                                    <ProtectedRoute>
                                        <Profile />
                                    </ProtectedRoute>
                                }
                            />

                            {/* 404 Page - Optional */}
                            <Route path="*" element={
                                <div style={{
                                    textAlign: 'center',
                                    padding: '4rem 2rem',
                                    minHeight: '60vh',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <h1>404 - Halaman Tidak Ditemukan</h1>
                                    <p>Halaman yang Anda cari tidak ada.</p>
                                    <a href="/" style={{
                                        color: '#9B4DFF',
                                        textDecoration: 'none',
                                        fontWeight: 'bold',
                                        marginTop: '1rem'
                                    }}>
                                        Kembali ke Beranda
                                    </a>
                                </div>
                            } />
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;