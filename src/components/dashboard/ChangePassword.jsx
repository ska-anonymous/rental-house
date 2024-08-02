import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { API_URL } from '../Config';

const ChangePassword = () => {


    const [isChangingPassword, setIsChangingPassword] = useState(false);

    const handleChangePassword = async (e) => {
        e.preventDefault();
        const form = e.target;

        // check new password and confirm password equality
        const newPassword = form.new_password.value;
        const confirmPassword = form.confirm_password.value;

        if (newPassword != confirmPassword)
            return toast.warning('New password and confirm password are not equal');

        const formData = new FormData(form);

        setIsChangingPassword(true);
        try {
            const response = await fetch(API_URL + '/change_password.php', {
                method: 'POST',
                credentials: 'include',
                body: formData
            })
            const result = await response.json();
            if (result.error)
                throw new Error(result['error-message']);
            toast.success('Password changed successfully')
            form.reset();
        } catch (err) {
            toast.error('Failed to change password ' + err.message);
            console.log('Failed to change password ', err);
        }
        setIsChangingPassword(false);

    }

    return (
        <>
            <div className="content-wrapper">
                {/* Content Header (Page header) */}
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0">Change Password</h1>
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
                        <form onSubmit={handleChangePassword}>
                            <div className="card">
                                <div className="card-body">
                                    <div className="form-group">
                                        <label htmlFor="old_password">Old Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="old_password"
                                            name="old_password"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="new_password">New Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="new_password"
                                            name="new_password"
                                            minLength={8}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="confirm_password">Confirm Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="confirm_password"
                                            name="confirm_password"
                                            minLength={8}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="card-footer">
                                    {
                                        isChangingPassword ? <button disabled type="submit" className="btn btn-primary">
                                            Submitting.....
                                        </button> : <button type="submit" className="btn btn-primary">
                                            Submit
                                        </button>
                                    }

                                </div>
                            </div>
                        </form>
                    </div>
                    {/* /.container-fluid */}
                </section>
                {/* /.content */}
            </div>
        </>
    )
}

export default ChangePassword