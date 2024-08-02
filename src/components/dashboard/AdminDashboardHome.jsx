import React, { useContext, useEffect, useState } from 'react'
import { API_URL } from '../Config';
import { AppContext } from '../../App';
import { toast } from 'react-toastify';
import { Numeral } from 'react-numeral';
import CanvasJSReact from '@canvasjs/react-charts';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const AdminDashboardHome = () => {

    const [refresh, setRefresh] = useState(false);

    const [dashboardData, setDashboardData] = useState(null);
    const [monthlyPayments, setMonthlyPayments] = useState([]);

    const { setLoadingBarProgress, theme } = useContext(AppContext);

    const currentYear = new Date().getFullYear();

    const splineOptions = {
        animationEnabled: true,
        theme: theme == 'light' ? 'light1' : 'dark1',
        title: {
            text: "Monthly Rent Collection - " + currentYear
        },
        axisX: {
            valueFormatString: "MMM"
        },
        axisY: {
            title: "",
            prefix: "PKR "
        },
        data: [{
            yValueFormatString: "PKR #,###",
            xValueFormatString: "MMMM",
            type: "spline",
            dataPoints: monthlyPayments.map(payment => {
                return { x: new Date(currentYear, payment.month - 1), y: parseFloat(payment.total_amount) }
            })
        }]
    }

    const fetchDashboardData = async () => {
        setLoadingBarProgress(30);

        try {

            const response = await fetch(API_URL + '/admin/dashboard.php', {
                method: 'GET',
                credentials: 'include'
            });

            setLoadingBarProgress(70);

            const result = await response.json();

            if (result.error) {
                throw new Error(result['error-message']);
            }

            setDashboardData(result.dashboard_data);
            setMonthlyPayments(result.dashboard_data.monthly_payments);

        } catch (err) {
            toast.error('Failed to fetch details ' + err.message);
            console.log('Failed to fetch data ', err);
        }

        setLoadingBarProgress(100);

    }

    const handleDataReload = () => {
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
                        {dashboardData &&
                            <>
                                <div className="row">
                                    <div className="col-sm-3">
                                        <div className="info-box mb-3">
                                            <span className="info-box-icon bg-warning elevation-1">
                                                <i className="fas fa-users" />
                                            </span>
                                            <div className="info-box-content">
                                                <span className="info-box-text">Total Users</span>
                                                <span className="info-box-number">{dashboardData.count_data.admin_count && ((dashboardData.count_data.admin_count - 0) + (dashboardData.count_data.tenant_count - 0) + (dashboardData.count_data.owner_count - 0))}</span>
                                            </div>
                                            {/* /.info-box-content */}
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="info-box mb-3">
                                            <span className="info-box-icon bg-danger elevation-1">
                                                <i className="fas fa-user-circle" />
                                            </span>
                                            <div className="info-box-content">
                                                <span className="info-box-text">Total Admins</span>
                                                <span className="info-box-number">{dashboardData.count_data.admin_count}</span>
                                            </div>
                                            {/* /.info-box-content */}
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="info-box mb-3">
                                            <span className="info-box-icon bg-success elevation-1">
                                                <i className="fas fa-key" />
                                            </span>
                                            <div className="info-box-content">
                                                <span className="info-box-text">Total Owners</span>
                                                <span className="info-box-number">{dashboardData.count_data.owner_count}</span>
                                            </div>
                                            {/* /.info-box-content */}
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="info-box mb-3">
                                            <span className="info-box-icon bg-info elevation-1">
                                                <i className="fas fa-bed" />
                                            </span>
                                            <div className="info-box-content">
                                                <span className="info-box-text">Total Tenants</span>
                                                <span className="info-box-number">{dashboardData.count_data.tenant_count}</span>
                                            </div>
                                            {/* /.info-box-content */}
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-3">
                                        <div className="info-box mb-3">
                                            <span className="info-box-icon bg-info elevation-1">
                                                <i className="fas fa-home" />
                                            </span>
                                            <div className="info-box-content">
                                                <span className="info-box-text">Total Houses</span>
                                                <span className="info-box-number">{dashboardData.count_data.house_count}</span>
                                            </div>
                                            {/* /.info-box-content */}
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
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
                                    <div className="col-sm-3">
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
                                    <div className="col-12">
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-sm-3 col-6">
                                                        <div className="description-block border-right">
                                                            <h5 className="description-header">{<Numeral value={dashboardData.total_invoices.toString()} format='0,0' />}</h5>
                                                            <span className="description-text">TOTAL INVOICES</span>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-3 col-6">
                                                        <div className="description-block border-right">
                                                            <h5 className="description-header">{<Numeral value={dashboardData.total_amount_receivable.toString()} format='0,0.0' />}</h5>
                                                            <span className="description-text">TOTAL AMOUNT</span>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-3 col-6">
                                                        <div className="description-block border-right">
                                                            <h5 className="description-header">{<Numeral value={dashboardData.total_paid.toString()} format={'0,0.0'} />}</h5>
                                                            <span className="description-text">TOTAL PAYMENTS DONE</span>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-3 col-6">
                                                        <div className="description-block border-right">
                                                            <h5 className="description-header">{<Numeral value={(dashboardData.total_amount_receivable - dashboardData.total_paid).toString()} format={'0,0.0'} />}</h5>
                                                            <span className="description-text">TOTAL DUES</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row my-3">
                                    <div className="col-12">
                                        <CanvasJSChart options={splineOptions}
                                        // onRef={ref => this.chart = ref}
                                        />
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

export default AdminDashboardHome;
