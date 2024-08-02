import React, { useContext } from 'react'
import { useState } from 'react';
import { toast } from 'react-toastify';
import { API_URL } from '../Config';
import { AppContext } from '../../App';
import { Navigate } from 'react-router-dom';

const AddHouse = () => {

    // first of all check if the owner(user) profile is incomplete (i.e user_id is null in user_details)
    const { user } = useContext(AppContext);
    if (!user.user_id) {
        toast.warning('Please complete your profile first');
        return <Navigate to={'/dashboard/profile'} />
    }

    const [isAddingHouse, setIsAddingHouse] = useState(false);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        setIsAddingHouse(true);

        try {
            const response = await fetch(API_URL + '/owner/add_new_house.php', {
                method: 'POST',
                credentials: 'include',
                body: formData
            })
            const result = await response.json();
            if (result.error)
                throw new Error(result['error-message'])
            toast.success('House Added Successfully');
            form.reset();
        } catch (err) {
            toast.error('Failed to Add House Try again later');
            console.log('Failed to add house', err);
        }
        setIsAddingHouse(false);
    }
    return (
        <>
            <div className="content-wrapper">
                {/* Content Header (Page header) */}
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0">Add New House</h1>
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
                            <div className="card">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <input className='form-control' type="text" placeholder='House Name' name='house_name' required />
                                            </div>
                                            <div className="form-group">
                                                <input className='form-control' type="text" placeholder='House Description' name='house_description' />
                                            </div>
                                            <div className="form-group">
                                                <input className='form-control' type="text" placeholder='House Location' required name='house_location' />
                                            </div>
                                            <div className="form-group">
                                                <input className='form-control' type="text" placeholder='House City' required name='house_city' />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <input type="number" className='form-control' min={0} placeholder='Total Rooms' name='house_no_of_rooms' required />
                                            </div>
                                            <div className="form-group">
                                                <input type="number" className='form-control' min={0} placeholder='Total Bed Rooms' name='house_no_of_bedrooms' required />
                                            </div>
                                            <div className="form-group">
                                                <input type="number" className='form-control' min={0} placeholder='House Square Area (in feet)' name='house_square_area' required />
                                            </div>
                                            <div className="form-group">
                                                <select className='form-control' defaultValue={''} placeholder='Attached Baths' name='house_attached_baths' required>
                                                    <option value="" disabled>Attached Baths</option>
                                                    <option value="1">Yes</option>
                                                    <option value="0">No</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <select className='form-control' defaultValue={''} placeholder='Car Wash' name='house_car_wash' required>
                                                    <option value="" disabled>Car Wash</option>
                                                    <option value="1">Yes</option>
                                                    <option value="0">No</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <select className='form-control' defaultValue={''} placeholder='Garage' name='house_garage' required>
                                                    <option value="" disabled>Garage</option>
                                                    <option value="1">Yes</option>
                                                    <option value="0">No</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <select className='form-control' defaultValue={''} placeholder='House Type' name='house_type' required>
                                                    <option value="" disabled>House Type</option>
                                                    <option value="house">House</option>
                                                    <option value="apartment">Apartment</option>
                                                    <option value="condominium">Condominium</option>
                                                    <option value="villa">Villa</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <input type="number" className='form-control' placeholder='Monthly Rent' min={0} step='any' name='monthly_rent' required />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-group">
                                                <label htmlFor="">House Pics</label>
                                                <input className='form-control' type="file" multiple={true} accept='image/*' placeholder='House Pics' name='house_pics[]' required />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer">
                                    {isAddingHouse
                                        ?
                                        <button type='submit' className='btn btn-primary' disabled>Adding... Please Wait</button>
                                        :
                                        <button type='submit' className='btn btn-primary'>Add House</button>
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

export default AddHouse
