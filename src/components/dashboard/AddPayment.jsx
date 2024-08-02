import React, { useContext, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify';
import { API_URL } from '../Config';
import { AppContext } from '../../App';

const AddPayment = () => {
    const state = useLocation().state;
    if (!state)
        return <Navigate to={'/dashboard'} />

    const bill = state.row;
    const contract = state.contract;

    const [paymentMethod, setPaymentMethod] = useState('cash');
    const [showPaymentMessage, setShowPaymentMessage] = useState(false);
    const [isAddingPayment, setIsAddingPayment] = useState(false);

    const { setLoadingBarProgress } = useContext(AppContext);

    const handleAddPayment = async (e) => {
        e.preventDefault();
        setShowPaymentMessage(false);
        const form = e.target;
        const formData = new FormData(form);

        // also append the data from the objects to the formData
        const { invoiceId } = bill;
        const { house_id, owner_id, tenant_id } = contract;


        formData.append('invoice_id', invoiceId)
        formData.append('house_id', house_id)
        formData.append('owner_id', owner_id)
        formData.append('tenant_id', tenant_id);

        setIsAddingPayment(true);
        setLoadingBarProgress(40);

        try {
            const response = await fetch(API_URL + '/tenant/add_payment.php', {
                method: 'POST',
                credentials: 'include',
                body: formData,
            })
            const result = await response.json();
            if (result.error)
                throw new Error(result['error-message']);

            form.reset();
            toast.success('Payment added successfully');

        } catch (err) {
            toast.error('Failed to add payment ' + err.message);
            console.log('Failed to add payment ', err);
        }

        setIsAddingPayment(false);
        setLoadingBarProgress(100);

    }

    return (
        <>
            <div className="content-wrapper">
                {/* Content Header (Page header) */}
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0">Add Payment</h1>
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
                        {/* payment added message */}
                        {showPaymentMessage &&
                            <div className='rounded p-1 bg-warning my-2 d-flex justify-content-between align-items-center'>
                                <div>
                                    Payment Added successfully. But this payment will be reviewed by the owner to verify or decline. So please be patient.
                                </div>
                                <div className='text-right'>
                                    <button onClick={() => setShowPaymentMessage(false)} className='btn btn-primary btn-xs'>ok</button>
                                </div>
                            </div>
                        }
                        <form onSubmit={handleAddPayment}>
                            <div className="card">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="payment_date">Payment Date</label>
                                                <input
                                                    type="date"
                                                    className="form-control"
                                                    id="payment_date"
                                                    name="payment_date"
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="payment_method">Payment Method</label>
                                                <select onChange={(e) => setPaymentMethod(e.target.value)} required className="form-control" id="payment_method" name="payment_method">
                                                    <option value="cash">Cash</option>
                                                    <option value="bank">Bank</option>
                                                    <option value="app">App</option>
                                                </select>
                                            </div>
                                            {paymentMethod != 'cash' &&
                                                <div className="form-group">
                                                    <label htmlFor="transaction_id">Transaction ID</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="transaction_id"
                                                        name="transaction_id"
                                                        required
                                                    />
                                                </div>
                                            }
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="payment_amount">Payment Amount</label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    id="payment_amount"
                                                    name="payment_amount"
                                                    min={0}
                                                    step={'any'}
                                                    defaultValue={0}
                                                    required
                                                />
                                            </div>
                                            {paymentMethod != 'cash' &&
                                                <>
                                                    <div className="form-group">
                                                        <label htmlFor="company_name">App/Bank Name</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="company_name"
                                                            name="company_name"
                                                            required
                                                            placeholder='HBL'
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="receipt_pic">Receipt Picture</label>
                                                        <input
                                                            type="file"
                                                            className="form-control-file"
                                                            id="receipt_pic"
                                                            name="receipt_pic"
                                                            accept='image/*'
                                                        />
                                                    </div>
                                                </>
                                            }

                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer">
                                    {isAddingPayment ? <button disabled type="submit" className="btn btn-primary">
                                        Adding......
                                    </button> : <button type="submit" className="btn btn-primary">
                                        Add
                                    </button>}

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

export default AddPayment