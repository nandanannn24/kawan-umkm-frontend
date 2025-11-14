import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import UserDashboard from './UserDashboard';
import UMKMDashboard from './UMKMDashboard';
import AdminDashboard from '../Admin/AdminDashboard';
import FadeIn from '../../components/FadeIn/FadeIn';

const Dashboard = () => {
    const { user } = useAuth();

    const renderDashboard = () => {
        switch (user?.role) {
            case 'admin':
                return <AdminDashboard />;
            case 'umkm':
                return <UMKMDashboard />;
            case 'user':
            default:
                return <UserDashboard />;
        }
    };

    return (
        <FadeIn direction="up" delay={100}>
            {renderDashboard()}
        </FadeIn>
    );
};

export default Dashboard;