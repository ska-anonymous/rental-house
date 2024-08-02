import React, { useContext } from 'react'
import { AppContext } from '../../App'
import { Link, Navigate, Outlet } from 'react-router-dom';
import { API_URL, APP_NAME } from '../Config';
import AdminDashboardMenu from './AdminDashboardMenu';
import OwnerDashboardMenu from './OwnerDashboardMenu';
import TenantDashboardMenu from './TenantDashboardMenu';
import { Theme } from './Theme';

const Dashboard = () => {


  const { user, handleLogout } = useContext(AppContext);

  if (!user) {
    return (
      <Navigate to={'/'} />
    )
  }


  return (
    <>
      <div className="wrapper">
        {/* Navbar */}
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
          {/* Left navbar links */}
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" data-widget="pushmenu" href="#" role="button">
                <i className="fas fa-bars" />
              </a>
            </li>
          </ul>
          {/* Right navbar links */}
          <ul className="navbar-nav ml-auto">
            {/* Navbar Search */}
            <li className="nav-item">
              <a
                className="nav-link"
                data-widget="navbar-search"
                href="#"
                role="button"
              >
                <i className="fas fa-search" />
              </a>
              <div className="navbar-search-block">
                <form className="form-inline">
                  <div className="input-group input-group-sm">
                    <input
                      className="form-control form-control-navbar"
                      type="search"
                      placeholder="Search"
                      aria-label="Search"
                    />
                    <div className="input-group-append">
                      <button className="btn btn-navbar" type="submit">
                        <i className="fas fa-search" />
                      </button>
                      <button
                        className="btn btn-navbar"
                        type="button"
                        data-widget="navbar-search"
                      >
                        <i className="fas fa-times" />
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </li>
            {/* user menu dropdown */}
            <li className="nav-item dropdown user-menu">
              <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown">
                <img
                  src={user.picture ? API_URL + '/uploads/profile_pics/' + user.picture : "/dist/img/avatar5.png"}
                  className="user-image img-circle elevation-2"
                  alt="User Image"
                />
                <span className="d-none d-md-inline">{user.usd_id ? user.name : user.username}</span>
              </a>
              <ul className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                {/* User image */}
                <li className="user-header bg-primary">
                  <img
                    src={user.picture ? API_URL + '/uploads/profile_pics/' + user.picture : "/dist/img/avatar5.png"}
                    className="img-circle elevation-2"
                    alt="User Image"
                  />
                  <p>
                    {user.usd_id ? user.name : user.username} <small>Member since {new Date(user.registration_date).toLocaleDateString('en-GB')}</small>
                  </p>
                </li>
                {/* Menu Footer*/}
                <li className="user-footer">
                  <Link className="btn btn-default btn-flat" to={'/dashboard/change-password'}>Change Password</Link>
                  <button className="btn btn-default btn-flat float-right" type='button' onClick={handleLogout}>
                    Log out
                  </button>
                </li>
              </ul>
            </li>

            {/* Notifications Dropdown Menu */}
            {/* <li className="nav-item dropdown">
              <a className="nav-link" data-toggle="dropdown" href="#">
                <i className="far fa-bell" />
                <span className="badge badge-warning navbar-badge">15</span>
              </a>
              <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                <span className="dropdown-item dropdown-header">
                  15 Notifications
                </span>
                <div className="dropdown-divider" />
                <a href="#" className="dropdown-item">
                  <i className="fas fa-envelope mr-2" /> 4 new messages
                  <span className="float-right text-muted text-sm">3 mins</span>
                </a>
                <div className="dropdown-divider" />
                <a href="#" className="dropdown-item">
                  <i className="fas fa-users mr-2" /> 8 friend requests
                  <span className="float-right text-muted text-sm">12 hours</span>
                </a>
                <div className="dropdown-divider" />
                <a href="#" className="dropdown-item">
                  <i className="fas fa-file mr-2" /> 3 new reports
                  <span className="float-right text-muted text-sm">2 days</span>
                </a>
                <div className="dropdown-divider" />
                <a href="#" className="dropdown-item dropdown-footer">
                  See All Notifications
                </a>
              </div>
            </li> */}
            <li className="nav-item">
              <a
                className="nav-link"
                data-widget="fullscreen"
                href="#"
                role="button"
              >
                <i className="fas fa-expand-arrows-alt" />
              </a>
            </li>
            <li className="nav-item">
              <span className='nav-link' role='button'>
                <Theme />
              </span>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                data-widget="control-sidebar"
                data-controlsidebar-slide="true"
                href="#"
                role="button"
              >
                <i className="fas fa-th-large" />
              </a>
            </li>
          </ul>
        </nav>
        {/* /.navbar */}
        {/* Main Sidebar Container */}
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
          {/* Brand Logo */}
          <Link to="/" className="brand-link">
            <img
              src="/images/home.png"
              alt="AdminLTE Logo"
              className="brand-image img-circle elevation-3"
              style={{ opacity: ".8", background: 'white' }}
            />
            <span className="brand-text font-weight-light">{APP_NAME}</span>
          </Link>
          {/* Sidebar */}
          <div className="sidebar">
            {/* SidebarSearch Form */}
            <div className="form-inline mt-1">
              <div className="input-group" data-widget="sidebar-search">
                <input
                  className="form-control form-control-sidebar"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <div className="input-group-append">
                  <button className="btn btn-sidebar">
                    <i className="fas fa-search fa-fw" />
                  </button>
                </div>
              </div>
            </div>
            {/* Sidebar Menu */}
            {user.role == 'admin' && <AdminDashboardMenu />}
            {user.role == 'owner' && <OwnerDashboardMenu />}
            {user.role == 'tenant' && <TenantDashboardMenu />}
            {/* /.sidebar-menu */}
          </div>
          {/* /.sidebar */}
        </aside>
        {/* Content Wrapper. Contains page content */}
        <Outlet />
        {/* /.content-wrapper */}
        <footer className="main-footer">
          <strong>
            {/* Developed By:  <a href="https://fiverr.com/salmankhana" target='_blank'>Salman Khan A</a> */}
            Developed By ABC
          </strong>
        </footer>
        {/* Control Sidebar */}
        <aside className="control-sidebar control-sidebar-dark">
          {/* Control sidebar content goes here */}
        </aside>
        {/* /.control-sidebar */}
      </div>
      {/* ./wrapper */}
    </>
  )
}

export default Dashboard
