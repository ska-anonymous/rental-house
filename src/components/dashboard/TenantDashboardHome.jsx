import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../App';
import { toast } from 'react-toastify';
import { API_URL } from '../Config';
import { Numeral } from 'react-numeral';

const TenantDashboardHome = () => {

    const [dashboardData, setDashboardData] = useState(null);
    const [refresh, setRefresh] = useState(false);

    const { setLoadingBarProgress } = useContext(AppContext);

    const fetchDashboardData = async () => {
        setLoadingBarProgress(40);
        try {
            const response = await fetch(API_URL + '/tenant/dashboard.php', {
                method: 'GET',
                credentials: 'include'
            })
            const result = await response.json();
            if (result.error)
                throw new Error(result['error-message']);
            setDashboardData(result.dashboard_data);
        } catch (err) {
            toast.error('Failed to get dashboard data ' + err.message);
            console.log('Failed to get dashboard data ', err);
        }
        setLoadingBarProgress(100);
    }

    const handleRefresh = () => {
        setRefresh(previousState => !previousState);
    }

    useEffect(() => {
        fetchDashboardData();
    }, [refresh])

    return (
        <>
            <div className="content-wrapper">
                {/* Content Header (Page header) */}
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0">Dashboard</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item">
                                        <i onClick={handleRefresh}
                                            className="fas fa-2x fa-sync-alt"
                                            role="button"
                                            title="Reload Data"
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
                        {dashboardData &&
                            <>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="info-box">
                                            <span className="info-box-icon bg-success elevation-1">
                                                <i className="fas fa-file-contract" />
                                            </span>
                                            <div className="info-box-content">
                                                <span className="info-box-text">Booked Houses </span>
                                                <span className="info-box-number">
                                                    {<Numeral value={dashboardData.total_contract_houses.toString()} format={'0,0'} />}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="info-box">
                                            <span className="info-box-icon bg-warning elevation-1">
                                                <i className="fas fa-clock" />
                                            </span>
                                            <div className="info-box-content">
                                                <span className="info-box-text">Pending Contracts</span>
                                                <span className="info-box-number">
                                                    {<Numeral value={dashboardData.total_pending_contracts.toString()} format={'0,0'} />}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="info-box mb-3 bg-info">
                                            <span className="info-box-icon">
                                                <i className="fas fa-file-invoice-dollar" />
                                            </span>
                                            <div className="info-box-content">
                                                <span className="info-box-text">Total Invoices And Amount</span>
                                                <span className="info-box-number">
                                                    <i className='badge badge-warning'>{<Numeral value={dashboardData.total_invoices.toString()} format={'0,0'} />}</i>
                                                    &nbsp;&nbsp;&nbsp;
                                                    {<Numeral value={dashboardData.total_amount_payable.toString()} format={'0,0'} />}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="info-box mb-3 bg-success">
                                            <span className="info-box-icon">
                                                <i className="fas fa-money-check-alt" />
                                            </span>
                                            <div className="info-box-content">
                                                <span className="info-box-text">Total Amount Paid</span>
                                                <span className="info-box-number">
                                                    {<Numeral value={dashboardData.total_paid.toString()} format={'0,0'} />}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="info-box mb-3 bg-warning">
                                            <span className="info-box-icon">
                                                <i className="fas fa-dollar-sign" />
                                            </span>
                                            <div className="info-box-content">
                                                <span className="info-box-text">Total Amount Due</span>
                                                <span className="info-box-number">
                                                    {<Numeral value={(dashboardData.total_amount_payable - dashboardData.total_paid).toString()} format={'0,0'} />}
                                                </span>
                                            </div>
                                        </div>
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

export default TenantDashboardHome
