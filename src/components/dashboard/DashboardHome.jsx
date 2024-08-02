import React, { useContext } from 'react'
import { AppContext } from '../../App'
import AdminDashboardHome from './AdminDashboardHome';
import OwnerDashboardHome from './OwnerDashboardHome';
import TenantDashboardHome from './TenantDashboardHome';

const DashboardHome = () => {
    const { user } = useContext(AppContext);

    if (user.role == 'admin') {
        return (
            <AdminDashboardHome />
        )
    }
    if (user.role == 'owner') {
        return (
            <OwnerDashboardHome />
        )
    }
    if (user.role == 'tenant') {
        return (
            <TenantDashboardHome />
        )
    }
}

export default DashboardHome
