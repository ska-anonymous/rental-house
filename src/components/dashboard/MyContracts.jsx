import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../App';
import { toast } from 'react-toastify';
import { API_URL } from '../Config';
import { Numeral } from 'react-numeral';
import { useNavigate } from 'react-router-dom';

const MyContracts = () => {

    const navigate = useNavigate();

    const [contracts, setContracts] = useState(null);

    const { setLoadingBarProgress, user } = useContext(AppContext);

    const fetchContracts = async () => {
        // this component can be used for many users so get the relevant contracts data
        let url;
        if (user.role == 'tenant')
            url = API_URL + '/tenant/my_contracts.php';
        else if (user.role == 'owner')
            url = API_URL + '/owner/my_contracts.php';
        setLoadingBarProgress(40);
        try {
            const response = await fetch(url, {
                method: 'GET',
                credentials: 'include',
            })

            const result = await response.json();
            if (result.error)
                throw new Error(result['error-message'])
            setContracts(result.my_contracts)
        } catch (err) {
            toast.error('Failed to fetch my contracts ' + err.message);
            console.log('Failed to fetch my contracts ', err);
        }
        setLoadingBarProgress(100);
    }

    const handleChangeStatus = async (contractId, newStatus) => {
        const willChangeStatus = confirm('Are you sure you want to change status?');
        if (!willChangeStatus)
            return
        setLoadingBarProgress(40);
        try {
            const response = await fetch(API_URL + '/owner/change_contract_status.php?contract_id=' + contractId + '&new_status=' + newStatus, {
                method: 'GET',
                credentials: 'include',
            })

            const result = await response.json();
            if (result.error)
                throw new Error(result['error-message'])
            setContracts(contracts.map(contract => {
                if (contract.rc_id == contractId) {
                    contract.status = newStatus;
                    return contract;
                } else {
                    return contract;
                }
            }))
        } catch (err) {
            toast.error('Failed to update the status ' + err.message);
            console.log('Failed to update the status ', err);
        }
        setLoadingBarProgress(100);
    }

    const handleBillingDetails = (contract) => {
        navigate('/dashboard/billing-details', { state: { contract } })
    }

    useEffect(() => {
        fetchContracts();
    }, [])

    return (
        <>
            <div className="content-wrapper">
                {/* Content Header (Page header) */}
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0">My Contracts</h1>
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
                        {contracts &&
                            <>
                                <div className="card card-warning">
                                    <div className="card-header">
                                        <div className="card-title">Pending</div>
                                        <div className="card-tools">
                                            <button
                                                type="button"
                                                className="btn btn-sm"
                                                data-card-widget="collapse"
                                                title="Collapse"
                                            >
                                                <i className="fas fa-minus" />
                                            </button>

                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <table className='table table-striped'>
                                            <thead>
                                                <tr>
                                                    <th>House Name</th>
                                                    {user.role == 'tenant' ? <th>Owner Name</th> : user.role == 'owner' && <th>Tenant Name</th>}
                                                    <th>Contract Start Date</th>
                                                    <th>Contract Duration</th>
                                                    <th>Montly Rent</th>
                                                    {user.role == 'owner' &&
                                                        <>
                                                            <th>Confirm</th>
                                                            <th>Cancel</th>
                                                        </>
                                                    }
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {contracts.filter(contract => contract.status == 'pending').map((contract, cindex) => {
                                                    return (
                                                        <tr key={'pending-contract-row-' + cindex}>
                                                            <td>{contract.house_name}</td>
                                                            <td>{user.role == 'tenant' ? contract.owner_name : user.role == 'owner' && contract.tenant_name}</td>
                                                            <td>{contract.start_date.split('-').reverse().join('-')}</td>
                                                            <td>{contract.duration} Months</td>
                                                            <td>{<Numeral value={contract.rent} format={'0,0'} />}</td>
                                                            {user.role == 'owner' &&
                                                                <>
                                                                    <td>
                                                                        <button className='btn btn-sm btn-success' onClick={() => handleChangeStatus(contract.rc_id, 'confirmed')}>Confirm</button>
                                                                    </td>
                                                                    <td>
                                                                        <button className='btn btn-sm btn-danger' onClick={() => handleChangeStatus(contract.rc_id, 'canceled')}>Cancel</button>
                                                                    </td>
                                                                </>
                                                            }
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="card card-success collapsed-card">
                                    <div className="card-header">
                                        <div className="card-title">Confirmed</div>
                                        <div className="card-tools">
                                            <button type="button" className="btn btn-tool" data-card-widget="collapse">
                                                <i className="fas fa-plus" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <table className='table table-striped'>
                                            <thead>
                                                <tr>
                                                    <th>House Name</th>
                                                    {user.role == 'tenant' ? <th>Owner Name</th> : user.role == 'owner' && <th>Tenant Name</th>}
                                                    <th>Contract Start Date</th>
                                                    <th>Contract Duration</th>
                                                    <th>Montly Rent</th>
                                                    <th>Billing Details</th>
                                                    {user.role == 'owner' &&
                                                        <>
                                                            <th>Finish</th>
                                                        </>
                                                    }
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {contracts.filter(contract => contract.status == 'confirmed').map((contract, cindex) => {
                                                    return (
                                                        <tr key={'pending-contract-row-' + cindex}>
                                                            <td>{contract.house_name}</td>
                                                            <td>{user.role == 'tenant' ? contract.owner_name : user.role == 'owner' && contract.tenant_name}</td>
                                                            <td>{contract.start_date.split('-').reverse().join('-')}</td>
                                                            <td>{contract.duration} Months</td>
                                                            <td>{<Numeral value={contract.rent} format={'0,0'} />}</td>
                                                            <td>
                                                                <button onClick={() => handleBillingDetails(contract)} className='btn btn-sm btn-success'>
                                                                    <i className='fa fa-receipt'></i>
                                                                </button>
                                                            </td>
                                                            {user.role == 'owner' &&
                                                                <>
                                                                    <td>
                                                                        <button className='btn btn-sm btn-info' onClick={() => handleChangeStatus(contract.rc_id, 'finished')}>Finish</button>
                                                                    </td>
                                                                </>
                                                            }
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="card card-danger collapsed-card">
                                    <div className="card-header">
                                        <div className="card-title">Canceled</div>
                                        <div className="card-tools">
                                            <button type="button" className="btn btn-tool" data-card-widget="collapse">
                                                <i className="fas fa-plus" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <table className='table table-striped'>
                                            <thead>
                                                <tr>
                                                    <th>House Name</th>
                                                    {user.role == 'tenant' ? <th>Owner Name</th> : user.role == 'owner' && <th>Tenant Name</th>}
                                                    <th>Contract Start Date</th>
                                                    <th>Contract Duration</th>
                                                    <th>Montly Rent</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {contracts.filter(contract => contract.status == 'canceled').map((contract, cindex) => {
                                                    return (
                                                        <tr key={'pending-contract-row-' + cindex}>
                                                            <td>{contract.house_name}</td>
                                                            <td>{user.role == 'tenant' ? contract.owner_name : user.role == 'owner' && contract.tenant_name}</td>
                                                            <td>{contract.start_date.split('-').reverse().join('-')}</td>
                                                            <td>{contract.duration} Months</td>
                                                            <td>{<Numeral value={contract.rent} format={'0,0'} />}</td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="card card-info collapsed-card">
                                    <div className="card-header">
                                        <div className="card-title">Finished</div>
                                        <div className="card-tools">
                                            <button type="button" className="btn btn-tool" data-card-widget="collapse">
                                                <i className="fas fa-plus" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <table className='table table-striped'>
                                            <thead>
                                                <tr>
                                                    <th>House Name</th>
                                                    {user.role == 'tenant' ? <th>Owner Name</th> : user.role == 'owner' && <th>Tenant Name</th>}
                                                    <th>Contract Start Date</th>
                                                    <th>Contract Duration</th>
                                                    <th>Montly Rent</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {contracts.filter(contract => contract.status == 'finished').map((contract, cindex) => {
                                                    return (
                                                        <tr key={'pending-contract-row-' + cindex}>
                                                            <td>{contract.house_name}</td>
                                                            <td>{user.role == 'tenant' ? contract.owner_name : user.role == 'owner' && contract.tenant_name}</td>
                                                            <td>{contract.start_date.split('-').reverse().join('-')}</td>
                                                            <td>{contract.duration} Months</td>
                                                            <td>{<Numeral value={contract.rent} format={'0,0'} />}</td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </>
                        }
                    </div>
                    {/* /.container-fluid */}
                </section>
                {/* /.content */}
            </div>
        </>
    )
}

export default MyContracts
