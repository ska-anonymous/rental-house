import React, { useContext, useEffect, useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { AppContext } from '../../App';
import { API_URL } from '../Config';
import { toast } from 'react-toastify';
import DataTable from 'react-data-table-component';
import { Numeral } from 'react-numeral';
import Spinner from './Spinner';

const BillingDetails = () => {

    const state = useLocation().state;
    if (!state)
        return <Navigate to={'/dashboard/my-contracts'} />

    const contract = state.contract;

    const navigate = useNavigate();

    const getMonthsAndYears = (startDate) => {
        const result = [];
        // the startDate will be in string format like '2022-01-01' so do the logic here to make the js Date obj
        let dateComponents = startDate.split('-');
        let y = dateComponents[0];
        let m = dateComponents[1];
        let d = dateComponents[2];
        let currentDate = new Date(y, m - 1, d);
        const today = new Date();

        while (currentDate <= today) {
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth() + 1; // Adding 1 because getMonth() returns 0-based index

            result.push({ year, month });

            // Move to the next month
            currentDate.setMonth(currentDate.getMonth() + 1);
        }

        return result;
    }

    const monthsAndYears = getMonthsAndYears(contract.start_date);

    const { user, setLoadingBarProgress } = useContext(AppContext);

    const [billingDetails, setBillingDetails] = useState([]);
    const [billingTableData, setBillingTableData] = useState([]);

    const { theme } = useContext(AppContext);

    const billingTableColumns = [
        { name: 'Month', selector: row => row.month },
        { name: 'Year', selector: row => row.year },
        {
            name: 'Total Bill',
            selector: row => row.bill ? <Numeral value={row.total.toString()} format={'0,0.0'} /> : <NoBill />
        },
        {
            name: 'Total Paid',
            selector: row => row.bill ? <Numeral value={row.totalPaid.toString()} format={'0,0.0'} /> : <NoBill />
        },
        {
            name: 'Due',
            selector: row => row.bill ? <Numeral value={row.due.toString()} format={'0,0.0'} /> : <NoBill />
        },
        {
            name: 'Generate Bill',
            omit: user.role != 'owner',
            selector: row => row.bill
                ?
                '---'
                :
                row.isGeneratingBill
                    ?
                    <Spinner width={20} height={20} />
                    :
                    <button onClick={() => handleGenerateBill(row)} className='btn btn-success btn-xs'><i className='fa fa-receipt'></i></button>
        },
        {
            name: 'Add Payment',
            omit: user.role != 'tenant',
            selector: row => row.bill && row.due != 0 ? <button onClick={() => handleAddPayment(row)} className='btn btn-xs btn-success'><i className='fa fa-credit-card'></i></button> : '----'
        },
        {
            name: 'Details',
            selector: row => row.bill
                ?
                <button className='btn btn-info btn-xs' onClick={() => handleViewBill(row)}><i className='fa fa-eye'></i></button>
                :
                <NoBill />
        }
    ]

    const handleAddPayment = (row) => {
        navigate('/dashboard/add-payment', { state: { row, contract } })
    }

    const handleViewBill = (row) => {
        navigate('/dashboard/view-bill', { state: { row } })
    }


    const conditionalRowStyles = [
        {
            when: row => !row.bill,
            style: {
                backgroundColor: 'rgb(254 213 213 / 90%)',
            },
        },
    ]


    const handleGenerateBill = async (row) => {
        const { month, year } = row;

        // now set the formData to send to the backend
        const formData = new FormData();
        formData.append('contract_id', contract.rc_id);
        formData.append('house_id', contract.house_id);
        formData.append('tenant_id', contract.tenant_id);
        formData.append('owner_id', contract.owner_id);
        formData.append('month', month);
        formData.append('year', year);
        formData.append('total', contract.rent);

        // to start loading spinner in that row
        setBillingTableData(billingTableData => billingTableData.map(billRow => {
            if (billRow.id == row.id)
                return ({ ...billRow, isGeneratingBill: true })
            else
                return billRow
        }))

        try {
            const response = await fetch(API_URL + '/owner/generate_bill.php', {
                method: 'POST',
                credentials: 'include',
                body: formData,
            })
            const result = await response.json();
            if (result.error)
                throw new Error(result['error-message']);

            let newBill = result.new_bill;
            setBillingDetails([...billingDetails, newBill]);

            setBillingTableData(billingTableData => billingTableData.map(billRow => {
                if (billRow.id == row.id)
                    return ({
                        ...billRow,
                        bill: true,
                        invoiceId: newBill.invoice_id,
                        total: newBill.total,
                        totalPaid: 0,
                        due: 0
                    })
                else
                    return billRow
            }))
        } catch (err) {
            toast.error('Failed to generate bill ' + err.message);
            console.log('Failed to generate bill ', err);
        }

        // to remove loading spinner
        setBillingTableData(billingTableData => billingTableData.map(billRow => {
            if (billRow.id == row.id)
                return ({ ...billRow, isGeneratingBill: false })
            else
                return billRow
        }))

    }

    const NoBill = () => {
        return (
            <span className='text-danger'>Bill Not Generated</span>
        )
    }

    const fetchBillingDetails = async () => {
        setLoadingBarProgress(40);
        try {
            const response = await fetch(API_URL + '/billing_details.php?contract_id=' + contract.rc_id, {
                method: 'GET',
                credentials: 'include',
            })

            const result = await response.json();
            if (result.error)
                throw new Error(result['error-message'])
            setBillingDetails(result.billing_details)
            // now also make the table data from billing details and all monthsAndYears
            setBillingTableData(monthsAndYears.map((monthYear, myIndex) => {
                const bills = result.billing_details;
                const month = monthYear.month;
                const year = monthYear.year;
                const thisBill = bills.find(bill => bill.month == month && bill.year == year);
                if (thisBill) {
                    return {
                        bill: true,
                        id: (myIndex + 1),
                        month: thisBill.month,
                        year: thisBill.year,
                        invoiceId: thisBill.invoice_id,
                        total: thisBill.total,
                        totalPaid: thisBill.total_paid,
                        due: thisBill.total - thisBill.total_paid
                    }
                }
                else {
                    return {
                        bill: false,
                        id: (myIndex + 1),
                        month: month,
                        year: year,
                    }
                }
            })
            )

        } catch (err) {
            toast.error('Failed to fetch contract billing details ' + err.message);
            console.log('Failed to fetch contract billing details ', err);
        }
        setLoadingBarProgress(100);
    }


    useEffect(() => {
        fetchBillingDetails();
    }, [])

    return (
        <>
            <div className="content-wrapper">
                {/* Content Header (Page header) */}
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0">Billing Details</h1>
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
                                <DataTable theme={theme == 'light' ? 'default' : 'dark'} pagination dense striped highlightOnHover columns={billingTableColumns} conditionalRowStyles={conditionalRowStyles} data={billingTableData} />
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

export default BillingDetails
