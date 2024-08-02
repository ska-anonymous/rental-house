import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../App';
import { toast } from 'react-toastify';
import { API_URL } from '../Config';
import { Numeral } from 'react-numeral';
import CanvasJSReact from '@canvasjs/react-charts';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const OwnerDashboardHome = () => {

    const [dashboardData, setDashboardData] = useState(null);
    const [monthlyPayments, setMonthlyPayments] = useState([]);
    const [topRevenueHouses, setTopRevenueHouses] = useState([]);
    const [refresh, setRefresh] = useState(false);

    const { setLoadingBarProgress, theme } = useContext(AppContext);


    const fetchDashboardData = async () => {
        setLoadingBarProgress(40);
        try {
            const response = await fetch(API_URL + '/owner/dashboard.php', {
                method: 'GET',
                credentials: 'include'
            })
            const result = await response.json();
            if (result.error)
                throw new Error(result['error-message']);
            setDashboardData(result.dashboard_data);
            setMonthlyPayments(result.dashboard_data.monthly_payments);
            setTopRevenueHouses(result.dashboard_data.top_revenue_houses);
        } catch (err) {
            toast.error('Failed to get dashboard data ' + err.message);
            console.log('Failed to get dashboard data ', err);
        }
        setLoadingBarProgress(100);
    }

    const currentYear = new Date().getFullYear();

    const splineOptions = {
        animationEnabled: true,
        theme: theme == 'light' ? 'light1': "dark1",
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

    const totalRevenueSum = topRevenueHouses.reduce((total, house) => {
        return total + (house.total_revenue - 0)
    }, 0)

    const pieOptions = {
        theme: theme == 'light' ? 'light2': "dark2",
        animationEnabled: true,
        exportFileName: "Top_5_Revenue_Generating_Houses",
        exportEnabled: true,
        title: {
            text: "Top 5 Revenue Generating Houses"
        },
        data: [{
            type: "pie",
            showInLegend: true,
            legendText: "{label}",
            toolTipContent: "{label}: <strong>{y}%</strong>",
            indexLabel: "{y}%",
            indexLabelPlacement: "inside",
            dataPoints: topRevenueHouses.map(house => { return { y: (house.total_revenue / totalRevenueSum * 100).toFixed(0), label: house.house_name } }),
            // dataPoints: [
            //     { y: 32, label: "Health" },
            //     { y: 22, label: "Finance" },
            //     { y: 15, label: "Education" },
            //     { y: 19, label: "Career" },
            //     { y: 5, label: "Family" },
            //     { y: 7, label: "Real Estate" }
            // ]
        }]
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
                                    <div className="col-md-4">
                                        <div className="info-box">
                                            <span className="info-box-icon bg-info elevation-1">
                                                <i className="fas fa-home" />
                                            </span>
                                            <div className="info-box-content">
                                                <span className="info-box-text">Total Houses</span>
                                                <span className="info-box-number">
                                                    {<Numeral value={dashboardData.total_houses.toString()} format={'0,0'} />}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
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
                                    <div className="col-md-4">
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
                                                    {<Numeral value={dashboardData.total_amount_receivable.toString()} format={'0,0'} />}
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
                                                    {<Numeral value={(dashboardData.total_amount_receivable - dashboardData.total_paid).toString()} format={'0,0'} />}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <CanvasJSChart options={pieOptions}
                                        /* onRef={ref => this.chart = ref} */
                                        />
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

export default OwnerDashboardHome
