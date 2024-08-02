import React, { useContext, useState } from 'react'
import { API_URL } from './Config';
import { toast } from 'react-toastify';
import { AppContext } from '../App';

const LoginModal = () => {

    const { setUser } = useContext(AppContext);

    const [isLoading, setIsloading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsloading(true);

        let form = e.target;
        let formData = new FormData(form);

        try {
            const response = await fetch(API_URL + '/auth/sign_in.php', {
                method: 'POST',
                body: formData,
                credentials: 'include'
            });
            const result = await response.json();
            if (result.error) {
                throw new Error(result['error-message']);
            }
            setUser(result.user);
            form.reset();
            form.querySelector('.close').click();
            toast.success('Login Successfull');
        } catch (err) {
            toast.error('Failed to Sign In: ' + err.message);
            console.log('failed to signin ', err);
        }


        setIsloading(false);
    }
    return (
        <>
            <div className="modal fade" id="loginModal" tabIndex="-1" role="dialog" aria-labelledby="loginModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <form onSubmit={handleLogin}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="loginModalLabel">Login</h5>
                                <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className='form-group'>
                                    <label htmlFor='userlogin'>Email</label>
                                    <input type='text' className='form-control' name='userlogin' id='userlogin' placeholder='Enter your email or username' required />
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='password'>Password</label>
                                    <input type='password' className='form-control' name='password' id='password' placeholder='Enter your password' required />
                                </div>
                            </div>
                            <div className="modal-footer">
                                {isLoading ? <button type="submit" className="btn btn-primary" disabled>signing in......</button> : <button type="submit" className="btn btn-primary">Sign in</button>}

                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default LoginModal
