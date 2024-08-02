import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { API_URL } from './Config';

const Contact = () => {

    const [isSubmitting, setIsSubmitting] = useState(false);


    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const form = event.currentTarget;
        const formData = new FormData(form);

        setIsSubmitting(true);
        try {
            const response = await fetch(API_URL + '/submit_message.php', {
                method: 'POST',
                body: formData,
                credentials: 'include'
            })
            const result = await response.json();
            if (result.error) {
                throw new Error(result['error-message']);
            }

            toast.success('Your message sent successfully');
            form.reset();

        } catch (err) {
            console.log('Error in sending message', err);
            toast('Failed to send message. Please try again latter');
        }
        setIsSubmitting(false);



    }
    return (
        <section className="contact_section mt-5" id='contact-section'>
            <div className="container">
                <div className="heading_container">
                    <h2>
                        Get In Touch
                    </h2>
                </div>
            </div>
            <div className="container-fluid">
                <div className="row justify-content-center">
                    {/* <div className="col-md-6 px-0">
                        <div className="map_container">
                            <div className="map-responsive">
                                <iframe src="https://www.google.com/maps/embed/v1/place?key=AIzaSyA0s1a7phLN0iaD6-UE7m4qP-z21pH0eSc&q=Eiffel+Tower+Paris+France" width="600" height="300" frameBorder="0" style={{ border: 0, width: "100%", height: "100%" }} allowFullScreen></iframe>
                            </div>
                        </div>
                    </div> */}
                    <div className="col-lg-4 col-md-5 ">
                        <div className="form_container">
                            <form onSubmit={handleFormSubmit}>
                                <div>
                                    <input type="text" name='m_name' placeholder="Name" required />
                                </div>
                                <div>
                                    <input type="email" name='m_email' placeholder="Email" required />
                                </div>
                                <div>
                                    <input type="text" name='m_phone' placeholder="Phone Number" required />
                                </div>
                                <div>
                                    <input type="text" className="message-box" placeholder="Message" name='m_message' required />
                                </div>
                                <div className="d-flex ">
                                    {
                                        isSubmitting ? <button type='submit' disabled>
                                            Sending......
                                        </button> : <button type='submit'>
                                            Send
                                        </button>
                                    }

                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </section>

    )
}

export default Contact
