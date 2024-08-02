import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify';
import { API_URL } from './Config';
import { AppContext } from '../App';
import { useNavigate } from 'react-router-dom';
import { Numeral } from 'react-numeral';

const Find = () => {

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [houses, setHouses] = useState(null);

    const { user } = useContext(AppContext);

    const handleFind = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        setIsLoading(true);
        try {
            const response = await fetch(API_URL + '/find_houses.php', {
                method: 'POST',
                credentials: 'include',
                body: formData
            })

            const result = await response.json();
            if (result.error)
                throw new Error(result['error-message']);
            setHouses(result.houses)
        } catch (err) {
            toast.error('Failed to search for the houses ' + err.message);
            console.log('Failed to search for the houses ', err);
        }
        setIsLoading(false);

    }

    const handleBookNow = (house) => {
        navigate('/dashboard/house-booking', { state: { house } })
    }

    return (
        <>
            <section className="find_section " id='find-section'>
                <div className="container">
                    <form onSubmit={handleFind}>
                        <div className="form-row">
                            <div className="col-md-5">
                                <input type="text" name='location' className="form-control" placeholder="Location/City" required minLength={3} />
                            </div>
                            <div className="col-md-5">
                                <select name="type" id="" className='form-control'>
                                    <option value="">All</option>
                                    <option value="house">House</option>
                                    <option value="apartment">Apartment</option>
                                    <option value="condominium">Condominium</option>
                                    <option value="villa">Villa</option>
                                </select>
                            </div>
                            <div className="col-md-2">
                                <button type="submit" className="">
                                    search
                                </button>
                            </div>
                        </div>

                    </form>
                </div>
            </section>
            {/* found(searched houses section below) */}
            <section className="sale_section layout_padding-bottom" id='houses-section'>
                <div className="container-fluid">
                    <div className="heading_container">
                        <h2>
                            {isLoading ? 'Searching for houses ' : houses ? houses.length == 0 ? 'No houses found for your search' : houses.length + ' Houses found for your search' : 'You can Search for houses using the above form'}
                        </h2>
                    </div>
                    {houses && houses.length > 0 &&
                        <div className="sale_container">
                            {houses.map((house, index) => {
                                return (
                                    <div className="box border border-dark rounded" key={'house-box-' + index}>
                                        {/* full details expandable card */}
                                        <div className="card card-success collapsed-card mb-0">
                                            <div className="card-header">
                                                <h3 className="card-title">Details</h3>
                                                <div className="card-tools">
                                                    <button
                                                        type="button"
                                                        className="btn btn-tool"
                                                        data-card-widget="collapse"
                                                    >
                                                        <i className="fas fa-plus" />
                                                    </button>
                                                </div>
                                                {/* /.card-tools */}
                                            </div>
                                            {/* /.card-header */}
                                            <div className="card-body">
                                                <table className='w-100 pb-1 border-bottom'>
                                                    <tbody>
                                                        <tr>
                                                            <td><b>Description</b></td>
                                                            <td colSpan={3}>{house.description}</td>
                                                        </tr>
                                                        <tr>
                                                            <td><b>Location</b></td>
                                                            <td colSpan={3}>{house.location}</td>
                                                        </tr>
                                                        <tr>
                                                            <td><b>City</b></td>
                                                            <td>{house.city}</td>
                                                            <td><b>House Type</b></td>
                                                            <td>{house.house_type}</td>
                                                        </tr>
                                                        <tr>
                                                            <td><b>Total Rooms</b></td>
                                                            <td>{house.no_of_rooms}</td>
                                                            <td><b>Total Bed Rooms</b></td>
                                                            <td>{house.no_of_bedroom}</td>
                                                        </tr>
                                                        <tr>
                                                            <td><b>Square Area</b></td>
                                                            <td>{<Numeral value={house.square_area} format={'0,0.00'} />}</td>
                                                            <td><b>Attached Baths</b></td>
                                                            <td>{house.attached_baths == 1 ? 'Yes' : 'No'}</td>
                                                        </tr>
                                                        <tr>
                                                            <td><b>Car Wash</b></td>
                                                            <td>{house.car_wash == 1 ? 'Yes' : 'No'}</td>
                                                            <td><b>Garage</b></td>
                                                            <td>{house.garage == 1 ? 'Yes' : 'No'}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <div>
                                                    <b>Pics</b>
                                                </div>
                                                <div className="row">
                                                    {house.pictures.split('_$$_').map((picName, pIndex) => {
                                                        return (
                                                            <div key={'img-col-' + pIndex} className='col-6'>
                                                                <a href={API_URL + '/uploads/house_pics/' + picName} target='_blank'>
                                                                    <img className='img-fluid' src={API_URL + '/uploads/house_pics/' + picName} alt="House Pic" />
                                                                </a>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                            {/* /.card-body */}
                                        </div>

                                        <div className="img-box">
                                            <img src={API_URL + '/uploads/house_pics/' + house.pictures.split('_$$_')[0]} alt="" />
                                        </div>
                                        <div className="detail-box px-3">
                                            <span>
                                                <b>{house.name}</b>
                                                <span> Rent: {<Numeral value={house.monthly_rent} format='0,0' />}</span>
                                            </span>
                                            <div className="text-center mb-2">
                                                {
                                                    user && user.role == 'tenant' ?
                                                        <button onClick={() => handleBookNow(house)} className='btn btn-success btn-sm'>Book Now</button>
                                                        :
                                                        <p className='text-danger'>Please Login as a tenant to be able book this house</p>
                                                }

                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    }
                </div>
            </section>
        </>
    )
}

export default Find
