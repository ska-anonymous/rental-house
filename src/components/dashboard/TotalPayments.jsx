import React, { useContext, useEffect, useState } from 'react'
import { Numeral } from 'react-numeral';
import { AppContext } from '../../App';
import { toast } from 'react-toastify';
import { API_URL } from '../Config';
import DataTable from 'react-data-table-component';
import Spinner from './Spinner';


const TotalPayments = () => {

    const [payments, setPayments] = useState(null);
    const [isChangingStatus, setIsChangingStatus] = useState(false);

    const { theme, user, setLoadingBarProgress } = useContext(AppContext);

    const paymentsColumns = [
        { name: 'Payment Date', selector: row => row.payment_date.split('-').reverse().join('-') },
        { name: 'Payment Method', selector: row => row.payment_method },
        { name: 'Transaction Id', selector: row => row.transaction_id || '----' },
        { name: 'Payment amount', selector: row => <Numeral value={row.payment_amount} format='0,0.0' /> },
        { name: 'App/Bank Name', selector: row => row.company_name || '----' },
        {
            name: 'Receipt',
            selector: row => row.receipt_pic ? <a href={API_URL + '/uploads/receipt_pics/' + row.receipt_pic} target='_blank'><img width={30} height={30} src={API_URL + '/uploads/receipt_pics/' + row.receipt_pic} /></a> : '----'
        },
        {
            name: 'Status',
            selector: row => row.payment_status
        },
        {
            name: 'Change Status',
            omit: user.role != 'owner',
            selector: row => row.payment_status == 'verification_pending' ? isChangingStatus ? <Spinner width={20} height={20} />
                :
                <>
                    <button title='verify' onClick={() => handleChangeStatus('verified', row)} className='btn btn-success btn-xs'><i className='fa fa-sync'></i></button>
                    <button title='flag' onClick={() => handleChangeStatus('flagged', row)} className='btn mx-1 btn-danger btn-xs'><i className='fa fa-sync'></i></button>
                </>
                : '----'
        }
    ]

    const paymentData = payments ? payments.map((payment, index) => {
        return {
            id: (index + 1),
            ...payment
        }
    }) : []

    const conditionalRowStyles = [
        {
            when: row => row.payment_status == 'verification_pending',
            style: {
                backgroundColor: 'rgb(255 212 132)',
            },
        },
        {
            when: row => row.payment_status == 'verified',
            style: {
                backgroundColor: 'rgb(201 255 182)',
            },
        },
        {
            when: row => row.payment_status == 'flagged',
            style: {
                backgroundColor: 'rgb(255 195 195 / 90%)',
            },
        }
    ]

    const handleChangeStatus = async (newStatus, row) => {
        const willChange = confirm('Do you really want to change status to "' + newStatus + '"');
        if (!willChange)
            return


        setIsChangingStatus(true);

        try {
            const response = await fetch(API_URL + '/owner/update_payment_status.php?new_status=' + newStatus + '&payment_id=' + row.id, {
                method: 'GET',
                credentials: 'include'
            });
            const result = await response.json();
            if (result.error)
                throw new Error(result['error-message']);
            setPayments(payments => {
                return payments.map(payment => {
                    if (payment.id == row.id)
                        return { ...payment, payment_status: newStatus }
                    else
                        return payment
                })
            })
        } catch (err) {
            toast.error('Failed to update status ' + err.message);
            console.log('Failed to update status ', err);
        }

        setIsChangingStatus(false);
    }

    const fetchPayments = async () => {
        setLoadingBarProgress(40);
        try {
            const response = await fetch(API_URL + `/${user.role}/get_payments.php`, {
                method: 'GET',
                credentials: 'include',
            })
            const result = await response.json();
            if (result.error)
                throw new Error(result['error-message']);
            setPayments(result.payments);
        } catch (err) {
            toast.error('Failed to fetch payments details ' + err.message);
            console.log('Failed to fetch payments details ', err);
        }
        setLoadingBarProgress(100);
    }

    useEffect(() => {
        fetchPayments();
    }, [])

    return (
        <>
            <div className="content-wrapper">
                {/* Content Header (Page header) */}
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0">Total Payments</h1>
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
                        {
                            payments &&

                            <DataTable theme={theme == 'light' ? 'default' : 'dark'} pagination dense striped highlightOnHover columns={paymentsColumns} conditionalRowStyles={conditionalRowStyles} data={paymentData} />

                        }
                    </div>
                    {/* /.container-fluid */}
                </section>
                {/* /.content */}
            </div>
        </>
    )
}

export default TotalPayments