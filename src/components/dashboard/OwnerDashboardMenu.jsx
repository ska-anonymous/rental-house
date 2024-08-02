import React from 'react'
import { Link, useLocation } from 'react-router-dom';


const OwnerDashboardMenu = () => {
    const location = useLocation();
    const pathname = location.pathname;

    return (
        <nav className="mt-2">
            <ul
                className="nav nav-pills nav-sidebar flex-column"
                data-widget="treeview"
                role="menu"
                data-accordion="false"
            >
                {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}
                <li className="nav-item">
                    <Link to="/dashboard" className={pathname == '/dashboard' ? 'nav-link active' : 'nav-link'}>
                        <i className="nav-icon fas fa-tachometer-alt" />
                        <p>
                            Dashboard
                        </p>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/dashboard/add-house" className={pathname == '/dashboard/add-house' ? 'nav-link active' : 'nav-link'}>
                        <i className="nav-icon fas fa-home" />
                        <p>
                            Add House
                        </p>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/dashboard/my-houses" className={pathname == '/dashboard/my-houses' ? 'nav-link active' : 'nav-link'}>
                        <i className="nav-icon fas fa-home" />
                        <p>
                            My Houses
                        </p>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/dashboard/my-contracts" className={pathname == '/dashboard/my-contracts' ? 'nav-link active' : 'nav-link'}>
                        <i className="nav-icon fas fa-file-alt" />
                        <p>
                            My Contracts
                        </p>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/dashboard/total-payments" className={pathname == '/dashboard/total-payments' ? 'nav-link active' : 'nav-link'}>
                        <i className="nav-icon fa fa-money-bill-alt" />
                        <p>
                            Total Payments
                        </p>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/dashboard/profile" className={pathname == '/dashboard/profile' ? 'nav-link active' : 'nav-link'}>
                        <i className="nav-icon fa fa-male" />
                        <p>
                            My Profile
                        </p>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default OwnerDashboardMenu
