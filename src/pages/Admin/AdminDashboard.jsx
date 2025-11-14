import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { adminAPI } from '../../services/api';
import FadeIn from '../../components/FadeIn/FadeIn';
import styles from './AdminPanel.module.css';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalUMKM: 0,
    pendingUMKM: 0,
    umkmOwners: 0
  });
  const [pendingUMKM, setPendingUMKM] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      setError('');

      const [statsResponse, umkmResponse] = await Promise.all([
        adminAPI.getStats(),
        adminAPI.getAllUMKM()
      ]);

      setStats(statsResponse.data);
      const pending = umkmResponse.data.filter(umkm => !umkm.is_approved);
      setPendingUMKM(pending);
    } catch (error) {
      console.error('Error fetching admin data:', error);
      setError('Gagal memuat data dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (umkmId) => {
    try {
      await adminAPI.approveUMKM(umkmId);
      fetchAdminData(); 
    } catch (error) {
      console.error('Error approving UMKM:', error);
      alert('Gagal menyetujui UMKM');
    }
  };

  const handleReject = async (umkmId) => {
    if (window.confirm('Apakah Anda yakin ingin menolak UMKM ini?')) {
      try {
        await adminAPI.rejectUMKM(umkmId);
        fetchAdminData();
      } catch (error) {
        console.error('Error rejecting UMKM:', error);
        alert('Gagal menolak UMKM');
      }
    }
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Memuat dashboard...</p>
      </div>
    );
  }

  return (
    <div className={styles.adminDashboard}>
      <FadeIn direction="down">
        <div className={styles.header}>
          <h1>Admin Dashboard</h1>
          <p>Selamat datang, {user?.name}</p>
        </div>
      </FadeIn>

      {error && (
        <div className={styles.error}>
          ⚠️ {error}
        </div>
      )}

      {/* Quick Stats */}
      <FadeIn direction="up" delay={200}>
        <div className={styles.quickStats}>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>{stats.totalUsers}</div>
            <div className={styles.statLabel}>Total Pengguna</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>{stats.totalUMKM}</div>
            <div className={styles.statLabel}>Total UMKM</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>{stats.umkmOwners}</div>
            <div className={styles.statLabel}>Pemilik UMKM</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>{stats.pendingUMKM}</div>
            <div className={styles.statLabel}>Menunggu Persetujuan</div>
          </div>
        </div>
      </FadeIn>

      {/* Pending UMKM Section */}
      <FadeIn direction="up" delay={300}>
        <div className={styles.pendingSection}>
          <h3>UMKM Menunggu Persetujuan</h3>
          {pendingUMKM.length > 0 ? (
            <div className={styles.pendingList}>
              {pendingUMKM.map(umkm => (
                <div key={umkm.id} className={styles.pendingItem}>
                  <div className={styles.pendingInfo}>
                    <h4>{umkm.name}</h4>
                    <p>{umkm.category} • {umkm.address}</p>
                    <p>Pemilik: {umkm.owner_name} ({umkm.owner_email})</p>
                    <span className={styles.pendingBadge}>Menunggu</span>
                  </div>
                  <div className={styles.pendingActions}>
                    <button
                      onClick={() => handleApprove(umkm.id)}
                      className="btn btn-success btn-sm"
                    >
                      Setujui
                    </button>
                    <button
                      onClick={() => handleReject(umkm.id)}
                      className="btn btn-danger btn-sm"
                    >
                      Tolak
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.noPending}>
              Tidak ada UMKM yang menunggu persetujuan
            </div>
          )}
        </div>
      </FadeIn>
    </div>
  );
};

export default AdminDashboard;