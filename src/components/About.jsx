import React from 'react'

const About = () => {
    return (
        <section className="about_section layout_padding-bottom" id='about-section'>
            <div className="square-box">
                <img src="images/square.png" alt="" />
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="img-box">
                            <img src="images/about-img.jpg" alt="" />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="detail-box">
                            <div className="heading_container">
                                <h2>
                                    About Our Apartments
                                </h2>
                            </div>
                            <p>
                                Welcome to our house rental platform, where your search for the perfect home takes center stage. With a passion for connecting individuals and families with their ideal living spaces, we are dedicated to simplifying the house-hunting process. Our mission is to not just find you a house, but to discover that special place where your lifestyle aspirations merge seamlessly with comfort and convenience. Backed by a team of real estate experts, we curate a diverse range of rental properties tailored to your unique preferences. Whether you're seeking a cozy apartment, a spacious family house, or a modern urban loft, we're here to turn your rental journey into a delightful experience. Join us in exploring a world of possibilities as you embark on the exciting path to finding your new home sweet home.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About
