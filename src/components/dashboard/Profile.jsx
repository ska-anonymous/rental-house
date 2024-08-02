import React, { useContext } from 'react'
import { AppContext } from '../../App';
import { Link } from 'react-router-dom';
import { API_URL } from '../Config';

const Profile = () => {

    const { user } = useContext(AppContext);

    return (
        <>
            <div className="content-wrapper">
                {/* Content Header (Page header) */}
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0">My Profile</h1>
                            </div>
                            {/* /.col */}
                        </div>
                        {/* /.row */}
                    </div>
                    {/* /.container-fluid */}
                </div>
                {/* /.content-header */}
                {/* Main content */}
                <section className="content">
                    <div className="container-fluid">
                        <div className="row justify-content-center">
                            <div className="col-6">
                                <div className="card card-primary card-outline">
                                    <div className="card-body box-profile">
                                        <div className='text-right'>
                                            {
                                                !user.user_id &&
                                                <span className='badge badge-danger'>Profile incomplete</span>
                                            }
                                            &nbsp;&nbsp;
                                            <Link title='Edit Profile' className='text-primary' to={'/dashboard/edit-profile'}>
                                                <i className='fa fa-pen'></i>
                                            </Link>
                                        </div>
                                        <div className="text-center">
                                            <img
                                                className="profile-user-img img-fluid img-circle"
                                                src={user.picture ? API_URL + '/uploads/profile_pics/' + user.picture : '/dist/img/avatar5.png'}
                                                alt="User profile picture"
                                            />
                                        </div>
                                        <h3 className="profile-username text-center">{user.name || user.username}</h3>
                                        <p className="text-muted text-center">{user.role} {user.gender && '(' + user.gender + ')'}</p>
                                        <ul className="list-group list-group-unbordered mb-3">
                                            <li className="list-group-item">
                                                <b>User Name</b> <a className="float-right">{user.username}</a>
                                            </li>
                                            <li className="list-group-item">
                                                <b>Email</b> <a className="float-right">{user.email}</a>
                                            </li>
                                            <li className="list-group-item">
                                                <b>Phone</b> <a className="float-right">{user.phone || '-----'}</a>
                                            </li>
                                            <li className="list-group-item">
                                                <b>CNIC</b> <a className="float-right">{user.cnic || '-----'}</a>
                                            </li>
                                            <li className="list-group-item">
                                                <b>Address</b> <a className="float-right">{user.address || '-----'}</a>
                                            </li>
                                            <li className="list-group-item">
                                                <b>Date Of Birth</b> <a className="float-right">{user.date_of_birth ? new Date(user.date_of_birth.split('-')[0], user.date_of_birth.split('-')[1] - 1, user.date_of_birth.split('-')[2]).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }) : '-----'}</a>
                                            </li>
                                            <li className="list-group-item">
                                                <b>Registered At:</b> <a className="float-right">{new Date(user.registration_date).toLocaleString(undefined, {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                    hour12: true,
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                    second: '2-digit',
                                                })}</a>
                                            </li>
                                        </ul>
                                    </div>
                                    {/* /.card-body */}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* /.container-fluid */}
                </section>
                {/* /.content */}
            </div>
        </>
    )
}

export default Profile
