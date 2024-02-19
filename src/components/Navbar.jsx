import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { FaAlignRight } from 'react-icons/fa';
import jquery, { data } from 'jquery';
import { useState } from 'react';
import { useEffect } from 'react';
import { getCurrentUserDetail, isLoggedIn, doLogout } from '../auth';

// for changing navbar  color
jquery(window).scroll(function() {
jquery('nav').toggleClass('scrolled', jquery(this).scrollTop() > 0);
})

const Navbar = () => {

    let navigate = useNavigate()
    const [login, setLogin]=useState(false)
    const [user, setUser]=useState(undefined)

     useEffect(()=>{

         setLogin(isLoggedIn())
         setUser(getCurrentUserDetail())

    },[login])

    const logout = () => {
        doLogout(()=>{
            //logged out
            setLogin(false);
            navigate("/");
            window.location.reload();
        })
    }

    return (
    <>
        <nav className="navbar navbar-expand-sm navbar-dark bg-transparent py-2 fixed-top">
            <div className="container-fluid ">
                <span className="navbar-brand font-weight-bolder">Happy Stay</span>
                <a href="void(0)" className="navbar-toggler border-0" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span>
                        <FaAlignRight className="nav-icon" /></span>
                </a>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to={"/hotel-reservation-react"} className="nav-link">Home</Link>
                        </li>

                        {login &&(
                           <>
                            <li className="nav-item">
                                <Link to={"/user/dashboard"} className="nav-link">Dashboard</Link>
                            </li>

                            <li className="nav-item">
                                <Link to={"/user/MyBookings"} className="nav-link">My Bookings</Link>
                            </li>

                            <li className="nav-item">
                                <Link to={"/user/profile-info"} className="nav-link">{user.firstName}</Link>
                            </li>

                           <li className="nav-item">
                                <Link onClick={logout} className="nav-link">Logout</Link>
                            </li>
                           </> 
                        )}
                        
                        
                        {!login &&(
                           <>
                            <li className="nav-item">
                                <Link to={"/login"} className="nav-link">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={"/Register"} className="nav-link">Sign up</Link>
                            </li>
                           </> 
                        )}


                        
                    </ul>
                </div>
            </div>
        </nav>
    </>
    );
}
export default Navbar;