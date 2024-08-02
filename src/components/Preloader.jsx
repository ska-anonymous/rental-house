import React from 'react'
import '../../public/css/preloader.css';

const Preloader = ({ preloader }) => {
    return (
        preloader &&
        <div>
            <div className="preloader-container">
                <div className="logo">
                    <img src="/images/home.png" alt="" />
                </div>
                <div className="circle circle-1">
                </div>
                <div className="circle circle-2">
                </div>
                <div className="circle circle-3">
                </div>
                <div className="circle circle-4">
                </div>
            </div>
        </div>

    )
}

export default Preloader
