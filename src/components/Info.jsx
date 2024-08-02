import React from 'react'

const Info = () => {
    return (
        <>
            <section className="info_section" id='info-section'>
                <div className="container d-flex justify-content-center mb-5">
                    <div className="heading_container">
                        <h2>
                            USEFUL INFORMATION
                        </h2>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <div className="info_contact">
                                <h5>
                                    About Apartment
                                </h5>
                                <div>
                                    <div className="img-box">
                                        <img src="images/location.png" width="18px" alt="" />
                                    </div>
                                    <p>
                                        Address
                                    </p>
                                </div>
                                <div>
                                    <div className="img-box">
                                        <img src="images/phone.png" width="12px" alt="" />
                                    </div>
                                    <p>
                                        +01 1234567890
                                    </p>
                                </div>
                                <div>
                                    <div className="img-box">
                                        <img src="images/mail.png" width="18px" alt="" />
                                    </div>
                                    <p>
                                        demo@gmail.com
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="info_info">
                                <h5>
                                    Information
                                </h5>
                                <p>
                                    ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                                </p>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="info_links">
                                <h5>
                                    Useful Link
                                </h5>
                                <ul>
                                    <li>
                                        <a href="">
                                            link 1
                                        </a>
                                    </li>
                                    <li>
                                        <a href="">
                                            link 2
                                        </a>
                                    </li>
                                    <li>
                                        <a href="">
                                            link 3
                                        </a>
                                    </li>
                                    <li>
                                        <a href="">
                                            link 4
                                        </a>
                                    </li>
                                    <li>
                                        <a href="">
                                            link 5
                                        </a>
                                    </li>
                                    <li>
                                        <a href="">
                                            link 6
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="info_form ">
                                <h5>
                                    Newsletter
                                </h5>
                                <form action="">
                                    <input type="email" placeholder="Enter your email" />
                                    <button>
                                        Subscribe
                                    </button>
                                </form>
                                <div className="social_box">
                                    <a href="">
                                        <img src="images/fb.png" alt="" />
                                    </a>
                                    <a href="">
                                        <img src="images/twitter.png" alt="" />
                                    </a>
                                    <a href="">
                                        <img src="images/linkedin.png" alt="" />
                                    </a>
                                    <a href="">
                                        <img src="images/youtube.png" alt="" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Info
