import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../App';
import { API_URL } from './Config';
import { useNavigate } from 'react-router-dom';
import { Numeral } from 'react-numeral';

const Houses = () => {

    const navigate = useNavigate();

    const { setLoadingBarProgress, user } = useContext(AppContext);

    const [featuredHouses, setFeaturedHouses] = useState([]);
    const [refresh, setRefresh] = useState(false);

    const fetchHouses = async () => {
        setLoadingBarProgress(40);
        try {
            const response = await fetch(API_URL + '/featured_houses.php');
            const result = await response.json();
            if (result.error)
                throw new Error(result['error-message']);
            setFeaturedHouses(result.featured_houses);
        } catch (err) {
            console.log('Failed to retrieve featured houses ', err);
        }
        setLoadingBarProgress(100);
    }

    const handleBookNow = (house) => {
        navigate('/dashboard/house-booking', { state: { house } })
    }

    useEffect(() => {
        fetchHouses();
    }, [refresh])

    return (
        <>
            <section className="sale_section layout_padding-bottom" id='houses-section'>
                <div className="container-fluid">
                    <div className="heading_container">
                        <h2>
                            Featured Houses For Rent
                        </h2>
                    </div>
                    <div className="sale_container">
                        {featuredHouses.map((house, index) => {
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
                    <div className="btn-box">
                        <a onClick={e => { e.preventDefault(); setFeaturedHouses([]); setRefresh(!refresh) }} href="">
                            Find More
                        </a>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Houses
