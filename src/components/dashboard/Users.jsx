import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../App';
import { API_URL } from '../Config';
import EditUserModal from './EditUserModal';
import { toast } from 'react-toastify';

const Users = () => {

    const [refresh, setRefresh] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false)

    const [usersRegistered, setUsersRegistered] = useState([]);
    const [usersFilter, setUsersFilter] = useState('');
    const { setLoadingBarProgress } = useContext(AppContext);

    const [userToEdit, setUserToEdit] = useState(null);


    const fetchUsersRegistered = async () => {

        setLoadingBarProgress(30);

        try {

            const response = await fetch(API_URL + '/admin/users.php', {
                method: 'GET',
                credentials: 'include'
            });

            setLoadingBarProgress(70);

            const result = await response.json();

            if (result.error) {
                throw new Error(result['error-message']);
            }

            setUsersRegistered(result.users);

        } catch (err) {
            toast.error('Failed to fetch details ' + err.message);
            console.log('Failed to fetch data ', err);
        }
        setLoadingBarProgress(100);

    }

    const handleEditUser = (user) => {
        setUserToEdit(user);
        setIsModalOpen(true)
    }

    const handleDeleteUser = async (deleteUser) => {

        const willDelete = confirm('Do you really want to delete this user?');
        if (!willDelete) {
            return;
        }

        const userId = deleteUser.id;
        try {
            const response = await fetch(API_URL + '/admin/delete_user.php?user_id=' + userId, {
                method: 'GET',
                credentials: 'include'
            });

            const result = await response.json();

            if (result.error) {
                throw new Error(result['error-message']);
            }

            toast.success('User Deleted Successfully');

            setUsersRegistered(usersRegistered.filter(user => user.id != deleteUser.id));

        } catch (err) {
            toast.error('Failed to Delete User: ' + err.message);
            console.log('Failed to Delete user ', err)
        }
    }

    const updateUser = (updatedUser) => {
        setUsersRegistered(usersRegistered.map(user => user.id == updatedUser.id ? updatedUser : user));
    }

    const handleDataReload = () => {
        setRefresh(previousState => !previousState);
    }

    useEffect(() => {
        fetchUsersRegistered();
    }, [refresh])


    return (
        <>
            <div className="content-wrapper">
                {/* Content Header (Page header) */}
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0">Users</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item">
                                        <i
                                            className="fas fa-2x fa-sync-alt"
                                            role="button"
                                            title="Reload Data"
                                            onClick={handleDataReload}
                                        />
                                    </li>
                                </ol>
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
                        <EditUserModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} user={userToEdit} setUser={setUserToEdit} updateUser={updateUser} />
                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-header">
                                        <label htmlFor="">
                                            Filter Users By Role
                                        </label>
                                        <select className='form-control' onChange={e => { setUsersFilter(e.target.value) }} >
                                            <option value="">All</option>
                                            <option value="admin">Admin</option>
                                            <option value="owner">Owner</option>
                                            <option value="tenant">Tenant</option>
                                        </select>
                                    </div>
                                    <div className="card-body" style={{ overflowX: 'auto' }}>
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Profile Picture</th>
                                                    <th>User Name</th>
                                                    <th>Role</th>
                                                    <th>Email</th>
                                                    <th>Phone</th>
                                                    <th>CNIC</th>
                                                    <th>Address</th>
                                                    <th>DOB</th>
                                                    <th>Date Registered</th>
                                                    {/* <th>Actions</th> */}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {usersRegistered.map((user, index) => {
                                                    if (user.role.includes(usersFilter)) {
                                                        return (
                                                            <tr key={'user-row-' + index}>
                                                                <td>{user.name || '-----'}</td>
                                                                <td>
                                                                    <a href={user.picture ? API_URL + '/uploads/profile_pics/' + user.picture : '/dist/img/avatar5.png'} target='_blank'>
                                                                        <img width={40} className='rounded' src={user.picture ? API_URL + '/uploads/profile_pics/' + user.picture : '/dist/img/avatar5.png'} alt="profile" />
                                                                    </a>
                                                                </td>
                                                                <td>{user.username}</td>
                                                                <td>{user.role}</td>
                                                                <td>{user.email}</td>
                                                                <td>{user.phone || '-----'}</td>
                                                                <td>{user.cnic || '-----'}</td>
                                                                <td>{user.address || '-----'}</td>
                                                                <td>{user.date_of_birth ? new Date(user.date_of_birth.split('-')[0], user.date_of_birth.split('-')[1] - 1, user.date_of_birth.split('-')[2]).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }) : '-----'}</td>
                                                                <td>{new Date(user.registration_date).toLocaleString('en-GB', {
                                                                    year: "numeric",
                                                                    month: "long",
                                                                    day: "numeric",
                                                                    hour12: true,
                                                                    hour: '2-digit',
                                                                    minute: '2-digit',
                                                                    second: '2-digit',
                                                                })}</td>

                                                                {/* <td>
                                                                    <button title='Edit User' onClick={() => {
                                                                        handleEditUser(user)
                                                                    }} className='btn btn-sm btn-success'>
                                                                        <i className='fas fa-edit'></i>
                                                                    </button>
                                                                    <button title='Delete User' onClick={() => {
                                                                        handleDeleteUser(user)
                                                                    }} className='btn btn-sm btn-danger mx-2'>
                                                                        <i className='fas fa-trash'></i>
                                                                    </button>
                                                                </td> */}
                                                            </tr>
                                                        )
                                                    }
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
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

export default Users
