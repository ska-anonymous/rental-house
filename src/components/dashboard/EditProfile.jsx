import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify';
import { API_URL } from '../Config';
import { AppContext } from '../../App';

const EditProfile = () => {

    const { user, setUser } = useContext(AppContext);

    const [isUpdating, setIsUpdating] = useState(false);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        setIsUpdating(true);
        try {
            const response = await fetch(API_URL + '/update_user_profile.php', {
                method: 'POST',
                credentials: 'include',
                body: formData
            })
            const result = await response.json();
            if (result.error)
                throw new Error(result['error-message']);
            // form.reset();
            toast.success('User Profile Updated Successfully');
            setUser(result.user);
        } catch (err) {
            toast.error('Failed to Update user profile ' + err.message);
            console.log('Failed to update profile', err);
        }
        setIsUpdating(false);

    }
    return (
        <>
            <div className="content-wrapper">
                {/* Content Header (Page header) */}
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0">Edit Profile</h1>
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
                        <form onSubmit={handleFormSubmit}>
                            {user.picture && <input type="hidden" name="old_picture" defaultValue={user.picture} />}
                            <div className="card">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="form-group">
                                                <input className='form-control' defaultValue={user.name || ''} placeholder='Full Name' type="text" name="name" required />
                                            </div>
                                            <div className="form-group">
                                                <input className='form-control' defaultValue={user.phone || ''} placeholder='Phone Number' type="text" pattern='[0-9]+' name="phone" required />
                                            </div>
                                            <div className="form-group">
                                                <select className='form-control' defaultValue={user.gender || ''} name='gender' required>
                                                    <option value="" disabled>Select Your Gender</option>
                                                    <option value="male">Male</option>
                                                    <option value="female">Female</option>
                                                    <option value="other">Other</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="form-group">
                                                <input className='form-control' defaultValue={user.cnic || ''} type="text" name="cnic" placeholder='CNIC (15605234xxxx)' pattern='[0-9]{13}' required />
                                            </div>
                                            <div className="form-group">
                                                <input className='form-control' defaultValue={user.address || ''} type="text" name="address" placeholder='Address' required />
                                            </div>
                                            <div className="form-group">
                                                <input className='form-control' defaultValue={user.date_of_birth || ''} type="date" name="dob" placeholder='Date Of Birth' required />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-group">
                                                <label htmlFor="">Profile Pic</label>
                                                <input className='form-control' type="file" accept='image/*' name="picture" required={!user.picture} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <img className='rounded' width={200} src={user.picture ? API_URL + '/uploads/profile_pics/' + user.picture : '/dist/img/avatar5.png'} alt="profile pic" />
                                    </div>
                                </div>
                                <div className="card-footer">
                                    {isUpdating ? <button type='submit' className='btn btn-primary' disabled>Updating Profile.....</button> : <button type='submit' className='btn btn-primary'>Update Profile</button>}

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

export default EditProfile
