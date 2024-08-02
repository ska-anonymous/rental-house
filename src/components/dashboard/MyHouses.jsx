import React, { useContext, useState } from 'react'
import { AppContext } from '../../App';
import { toast } from 'react-toastify';
import { API_URL } from '../Config';
import { useEffect } from 'react';
import { Numeral } from 'react-numeral';

const MyHouses = () => {

    const { setLoadingBarProgress } = useContext(AppContext);

    const [refresh, setRefresh] = useState(false);
    const [houses, setHouses] = useState([]);

    const fetchHouses = async () => {
        setLoadingBarProgress(40);
        try {
            const response = await fetch(API_URL + '/owner/my_houses.php', {
                method: 'GET',
                credentials: 'include'
            });
            const result = await response.json();
            if (result.error)
                throw new Error(result['error-message']);
            setHouses(result.houses);
        } catch (err) {
            toast.error('Failed to load houses data ' + err.message);
            console.log('Failed to load houses data ', err);
        }
        setLoadingBarProgress(100);
    }

    const handleDataReload = () => {
        setRefresh(previousState => !previousState);
    }

    const handleEditHouse = async (house) => {
        toast.warning(house.name + ' will be able to be edited when this features is available');
    }

    const handleDeleteHouse = async (houseId) => {
        // first confirm deletion
        let willDelete = confirm('Do you really want to delete this house?')
        if (!willDelete)
            return
        try {
            const response = await fetch(API_URL + '/owner/delete_house.php?houseId=' + houseId, {
                method: 'GET',
                credentials: 'include'
            });
            const result = await response.json();
            if (result.error)
                throw new Error(result['error-message']);
            toast.success('House Deleted Successfully');
            setHouses(houses.filter(house => house.id != houseId));
        } catch (err) {
            toast.error('Failed to delete house ' + err.message);
            console.log('Failed to delete house ', err);
        }
    }

    useEffect(() => {
        fetchHouses();
    }, [refresh])

    return (
        <>
            <div className="content-wrapper">
                {/* Content Header (Page header) */}
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0">My Houses</h1>
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
                        <div className="card">
                            <div className="card-body">
                                {houses.length > 0 &&
                                    <table className='table table-striped table-responsive'>
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Description</th>
                                                <th>Location</th>
                                                <th>City</th>
                                                <th>Total Rooms</th>
                                                <th>Total Bed Rooms</th>
                                                <th>Area</th>
                                                <th>Attached Baths</th>
                                                <th>Car Wash</th>
                                                <th>Garage</th>
                                                <th>House Type</th>
                                                <th>Monthly Rent</th>
                                                <th>House Registration Date</th>
                                                <th>Edit</th>
                                                <th>Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {houses.map((house, index) => {
                                                return (
                                                    <tr key={'house-row-' + index}>
                                                        <td>{house.name}</td>
                                                        <td>{house.description}</td>
                                                        <td>{house.location}</td>
                                                        <td>{house.city}</td>
                                                        <td>{house.no_of_rooms}</td>
                                                        <td>{house.no_of_bedroom}</td>
                                                        <td>{<Numeral value={house.square_area} format='0,0.00' />}</td>
                                                        <td>{house.attached_baths == 1 ? 'Yes' : 'No'}</td>
                                                        <td>{house.car_wash == 1 ? 'Yes' : 'No'}</td>
                                                        <td>{house.garage == 1 ? 'Yes' : 'No'}</td>
                                                        <td>{house.house_type}</td>
                                                        <td>{<Numeral value={house.monthly_rent} format='0,0' />}</td>
                                                        <td>{new Date(house.registration_date).toLocaleString(undefined, { day: '2-digit', month: 'long', year: 'numeric', hour12: true, hour: '2-digit', minute: '2-digit', second: '2-digit' })}</td>
                                                        <td>
                                                            <button onClick={() => handleEditHouse(house)} title='Edit This House' className='btn btn-success btn-sm'>
                                                                <i className='fa fa-pen'></i>
                                                            </button>
                                                        </td>
                                                        <td>
                                                            <button onClick={() => handleDeleteHouse(house.id)} title='Delete This House' className='btn btn-danger btn-sm'>
                                                                <i className='fa fa-trash'></i>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                }

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

export default MyHouses
