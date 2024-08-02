import React, { useContext } from 'react'
import { AppContext } from '../App';
import { Link } from 'react-router-dom';

const Header = () => {

    const { user } = useContext(AppContext)

    const handleNav = () => {
        window.openNav();
    }
    const handleLinkClick = () => {
        window.openNav();
    }

    return (
        <div className="hero_area" id='header-section'>
            <header className="header_section">
                <div className="container-fluid">
                    <nav className="navbar navbar-expand-lg custom_nav-container">
                        <Link className="navbar-brand" href="/">
                            <img src="images/logo.png" alt="" />
                        </Link>
                        <div className="navbar-collapse" id="">
                            <ul className="navbar-nav justify-content-between ">
                                <div className="User_option">
                                    <li className="">
                                        {user ? <Link className="mr-4" to={'/dashboard'}>Dashboard</Link> : <a className="mr-4" href='#login' data-bs-toggle="modal" data-bs-target="#loginModal">
                                            Sign in
                                        </a>}
                                        <a className="" href="#signup" data-bs-toggle="modal" data-bs-target="#singupModal">
                                            Sign up
                                        </a>
                                    </li>
                                </div>
                            </ul>

                            <div className="custom_menu-btn">
                                <button onClick={handleNav}>
                                    <span className="s-1">

                                    </span>
                                    <span className="s-2">

                                    </span>
                                    <span className="s-3">

                                    </span>
                                </button>
                            </div>
                            <div id="myNav" className="overlay">
                                <div className="overlay-content" onClick={handleLinkClick}>
                                    <a href="#header-section">HOME</a>
                                    <a href="#find-section">FIND HOUSE</a>
                                    <a href="#about-section">ABOUT</a>
                                    <a href="#houses-section">HOUSES</a>
                                    <a href="#excellence-section">WHY US</a>
                                    <a href="#contact-section">CONTACT US</a>
                                    <a href="#info-section">INFO SECTION</a>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            </header>
            <section className="slider_section">
                <div className="container-fluid mt-5">
                    <div className="row">
                        <div className="col-md-4 offset-md-1">
                            <div className="detail-box">
                                <h1>
                                    <span> Modern</span> <br />
                                    Apartment <br />
                                    Houses
                                </h1>
                                <p>
                                    Discover Your Ideal Home for Rent: Where Every Step Leads You Closer to Comfort, Convenience, and Happiness.
                                </p>
                                {/* <div className="btn-box">
                                    <a href="" className="">
                                        Read More
                                    </a>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Header
