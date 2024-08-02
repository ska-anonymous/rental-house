import React from 'react'
import { Link, useLocation } from 'react-router-dom';


const AdminDashboardMenu = () => {
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
          <Link to="/dashboard/users" className={pathname == '/dashboard/users' ? 'nav-link active' : 'nav-link'}>
            <i className="nav-icon fas fa-users" />
            <p>
              Users
            </p>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/dashboard/messages" className={pathname == '/dashboard/messages' ? 'nav-link active' : 'nav-link'}>
            <i className="nav-icon fa fa-comment" />
            <p>
              Messages
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

export default AdminDashboardMenu
