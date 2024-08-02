import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { API_URL } from '../Config'

const Messages = () => {

    const [messages, setMessages] = useState([]);

    const getMessages = async () => {
        try {
            const response = await fetch(API_URL + '/admin/get_messages.php', {
                method: 'GET',
                credentials: 'include'
            })
            const result = await response.json();
            if (result.error) {
                throw new Error(result['error-message']);
            }
            setMessages(result);
        } catch (err) {
            console.log('Failed to get messages ', err);
            toast.error('Failed to get messages');
        }
    }

    useEffect(() => {
        getMessages();
    }, [])
    return (
        <>
            <div className="content-wrapper">
                {/* Content Header (Page header) */}
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0">Messages</h1>
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
                                <table className='table'>
                                    <thead>
                                        <tr>
                                            <th>S.No</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Phone</th>
                                            <th>Message</th>
                                            <th>Date Time</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            messages.map((msg, index) => {
                                                return (
                                                    <tr key={'message-row-' + index}>
                                                        <td>{index + 1}</td>
                                                        <td>{msg.m_name}</td>
                                                        <td>{msg.m_email}</td>
                                                        <td>{msg.m_phone}</td>
                                                        <td>{msg.m_message}</td>
                                                        <td>{msg.m_date}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
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

export default Messages