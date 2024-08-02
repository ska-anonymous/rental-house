import React, { useContext, useEffect, useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { AppContext } from '../../App';
import { toast } from 'react-toastify';
import { API_URL } from '../Config';
import { Numeral } from 'react-numeral';

const HouseBooking = () => {
    const state = useLocation().state;
    if (!state)
        return <Navigate to={'/dashboard'} />

    const house = state.house;

    const { setLoadingBarProgress, user } = useContext(AppContext);

    // first of all check if the tenant(user) profile is incomplete (i.e user_id is null in user_details)
    if (!user.user_id) {
        toast.warning('Please complete your profile first');
        return <Navigate to={'/dashboard/profile'} />
    }

    const [houseOwnerDetails, setHouseOwnerDetails] = useState(null)

    const navigate = useNavigate();

    const fetchHouseOwnerDetails = async () => {
        setLoadingBarProgress(40);
        try {
            const response = await fetch(API_URL + '/tenant/house_owner_details.php?ownerId=' + house.owner_id, {
                method: 'GET',
                credentials: 'include'
            })
            const result = await response.json();
            if (result.error)
                throw new Error(result['error-message'])
            setHouseOwnerDetails(result.house_owner_details)
        } catch (err) {
            toast.error('Failed to fetch house owner details ' + err.message);
            console.log('Failed to fetch house owner details ', err);
        }
        setLoadingBarProgress(100);
    }

    const handleContractSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        setLoadingBarProgress(40);
        try {
            const response = await fetch(API_URL + '/tenant/house_booking.php', {
                method: 'POST',
                credentials: 'include',
                body: formData
            })

            const result = await response.json();
            if (result.error)
                throw new Error(result['error-message'])
            form.reset();
            toast.success('Successfully submitted the contract form. Please wait for the owner to review your form')
            navigate('/dashboard/my-contracts');
        } catch (err) {
            toast.error('Failed to submit the contract form ' + err.message);
            console.log('Failed to submit the contract form ', err);
        }
        setLoadingBarProgress(100);
    }

    useEffect(() => {
        fetchHouseOwnerDetails();
    }, [])
    return (
        <>
            <div className="content-wrapper">
                {/* Content Header (Page header) */}
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0">House Booking</h1>
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
                        <div className="card card-primary">
                            <div className="card-header">
                                <div className="card-title">Details</div>
                            </div>
                            <div className="card-body">
                                {houseOwnerDetails &&
                                    <>
                                        <h5>House Owner Details</h5>
                                        <table className='w-100'>
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Phone</th>
                                                    <th>Gender</th>
                                                    <th>Address</th>
                                                    <th>Picture</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>{houseOwnerDetails.name || '------'}</td>
                                                    <td>{houseOwnerDetails.phone || '------'}</td>
                                                    <td>{houseOwnerDetails.gender || '------'}</td>
                                                    <td>{houseOwnerDetails.address || '------'}</td>
                                                    <td>
                                                        {houseOwnerDetails.picture
                                                            ?
                                                            <a href={API_URL + '/uploads/profile_pics/' + houseOwnerDetails.picture} target='_blank'>
                                                                <img className='rounded' src={API_URL + '/uploads/profile_pics/' + houseOwnerDetails.picture} width={70} alt="" />
                                                            </a>
                                                            :
                                                            'No Image'
                                                        }
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <hr />
                                    </>
                                }
                                <h5>House Details</h5>
                                <table className='w-100'>
                                    <tbody>
                                        <tr>
                                            <th>Name</th>
                                            <th>Location</th>
                                            <th>City</th>
                                            <th>No of bedrooms</th>
                                            <th>Total Rooms</th>
                                            <th>Area</th>
                                        </tr>
                                        <tr>
                                            <td>{house.name}</td>
                                            <td>{house.location}</td>
                                            <td>{house.city}</td>
                                            <td>{house.no_of_bedroom}</td>
                                            <td>{house.no_of_rooms}</td>
                                            <td>{<Numeral value={house.square_area} format='0,0.00' />}</td>
                                        </tr>
                                        <tr>
                                            <th>Attached Baths</th>
                                            <th>Car Wash</th>
                                            <th>Garage</th>
                                            <th>House Type</th>
                                            <th>Monthly Rent</th>
                                        </tr>
                                        <tr>
                                            <td>{house.attached_baths == 1 ? 'Yes' : 'No'}</td>
                                            <td>{house.car_wash == 1 ? 'Yes' : 'No'}</td>
                                            <td>{house.garage == 1 ? 'Yes' : 'No'}</td>
                                            <td>{house.house_type}</td>
                                            <td>{<Numeral value={house.monthly_rent} format='0,0' />}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <form onSubmit={handleContractSubmit}>
                            <input type="hidden" name="house_id" value={house.id} />
                            <input type="hidden" name="owner_id" value={house.owner_id} />
                            <div className="card card-primary">
                                <div className="card-header">
                                    <div className="card-title">Booking(Rent Contract) Form</div>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label htmlFor="">Contract Start Date</label>
                                                <input className='form-control' type="date" name="start_date" id="" required />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label htmlFor="">Contract Duration (Months)</label>
                                                <input defaultValue={0} className='form-control' type="number" min={0} step={0.5} name="duration" id="" required />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label htmlFor="">Rent</label>
                                                <input className='form-control' type="number" value={house.monthly_rent} name="rent" id="" readOnly />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <button type='submit' className="btn btn-primary">Confirm</button>
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

export default HouseBooking
