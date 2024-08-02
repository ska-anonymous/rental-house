import React from 'react'

const Client = () => {
    return (
        <section className="client_section layout_padding" id='client-section'>
            <div className="container-fluid">
                <div className="heading_container">
                    <h2>
                        What is Says Our Customer
                    </h2>
                </div>
                <div className="client_container">
                    <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <div className="box">
                                    <div className="img-box">
                                        <img src="images/client.jpg" alt="" />
                                    </div>
                                    <div className="detail-box">
                                        <h5>
                                            <span>Majority</span>
                                            <hr />
                                        </h5>
                                        <p>
                                            There are many variations of passages of Lorem Ipsum available, but the majority have suffered
                                            alteration
                                            in some form, by injected humour, or randomised words which don't look even slightly believable.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <div className="box">
                                    <div className="img-box">
                                        <img src="images/client.jpg" alt="" />
                                    </div>
                                    <div className="detail-box">
                                        <h5>
                                            <span>Majority</span>
                                            <hr />
                                        </h5>
                                        <p>
                                            There are many variations of passages of Lorem Ipsum available, but the majority have suffered
                                            alteration
                                            in some form, by injected humour, or randomised words which don't look even slightly believable.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <div className="box">
                                    <div className="img-box">
                                        <img src="images/client.jpg" alt="" />
                                    </div>
                                    <div className="detail-box">
                                        <h5>
                                            <span>Majority</span>
                                            <hr />
                                        </h5>
                                        <p>
                                            There are many variations of passages of Lorem Ipsum available, but the majority have suffered
                                            alteration
                                            in some form, by injected humour, or randomised words which don't look even slightly believable.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                            <span className="sr-only">Next</span>
                        </a>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default Client
