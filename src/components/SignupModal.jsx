import React, { useState } from 'react'
import { API_URL } from './Config';
import { toast } from 'react-toastify';

const SignupModal = () => {

    const [isLoading, setIsloading] = useState(false);

    const handleSignUp = async(e) => {
        e.preventDefault();
        setIsloading(true);

        let form = e.target;
        let formData = new FormData(form);

        try {
            const response = await fetch(API_URL + '/auth/sign_up.php', {
                method: 'POST',
                body: formData,
            });
            const result = await response.json();
            if (result.error) {
                throw new Error(result['error-message']);
            }
            toast.success('Sign up Successfull');
            form.reset();
            form.querySelector('.close').click();

        } catch (err) {
            toast.error('Failed to Sign up: ' + err.message);
            console.log('failed to sing up ', err);
        }


        setIsloading(false);
    }
    return (
        <>
            <div className="modal fade" id="singupModal" tabIndex="-1" role="dialog" aria-labelledby="singupModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <form onSubmit={handleSignUp} method="POST">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="singupModalLabel">Sign Up</h5>
                                <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="user_name">User Name</label>
                                    <input type="text" className="form-control" id="user_name" name="user_name" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" className="form-control" id="email" name="email" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="signup-password">Password</label>
                                    <input type="password" className="form-control" id="signup-password" name="password" minLength="8" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="role">Role</label>
                                    <select className="form-control" id="role" name="role" required>
                                        <option value="owner">Owner</option>
                                        <option value="tenant">Tenant</option>
                                    </select>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                {isLoading ? <button type="submit" className="btn btn-primary" disabled>Signining.. up</button> : <button type="submit" className="btn btn-primary">Sign Up</button>}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default SignupModal
