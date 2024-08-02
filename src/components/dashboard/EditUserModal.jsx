import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { API_URL } from '../Config';

const EditUserModal = ({ user, setUser, updateUser, isModalOpen, setIsModalOpen }) => {

    if (!user) {
        return;
    }

    const [loading, setLoading] = useState(false);


    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const handleUserUpdate = async (e) => {
        e.preventDefault();

        // setLoading(true);
        const formData = new FormData();
        formData.append('user_id', user.id);
        formData.append('username', user.username);
        formData.append('email', user.email);
        try {
            const response = await fetch(API_URL + '/admin/update_user.php', {
                method: 'POST',
                credentials: 'include',
                body: formData
            });

            const result = await response.json();
            if (result.error) {
                throw new Error(result['error-message']);
            }

            toast.success('User Updated Successfully');

            // now change the displayed user info
            updateUser(user);
            setIsModalOpen(false);

        } catch (err) {
            toast.error('Failed to Update User: ' + err.message);
            console.log('Failed to update user ', err)
        }
        setLoading(false);
    }

    return (
        <>
            {isModalOpen && <div className="modal fade show" style={{ display: 'block' }} id="edit-user-modal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Edit User</h4>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                                onClick={() => setIsModalOpen(false)}
                            >
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleUserUpdate}>
                                <div className="mb-3">
                                    <label htmlFor="user_name" className="form-label">
                                        Username
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="user_name"
                                        name="username"
                                        required
                                        value={user.username}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        required
                                        value={user.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                {loading ? <button type="submit" className="btn btn-primary" disabled>
                                    Updating User.....
                                </button> : <button type="submit" className="btn btn-primary">
                                    Update
                                </button>}

                            </form>
                        </div>

                    </div>
                    {/* /.modal-content */}
                </div>
                {/* /.modal-dialog */}
            </div >}

        </>
    )
}

export default EditUserModal
