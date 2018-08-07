// import React, { Component } from 'react'
import React from 'react';
import { Link } from 'react-router-dom';
import MainLogo from '../../assets/images/main-logo.png';
import MainModal from '../../assets/images/main-modal.png';
import "./Nav.css";
import * as routes from '../../constants/routes';
import SignOutButton from '../SignOut';


const Navigation = ({ authUser }) =>
    <div>
        {authUser
            ? <NavigationAuth />
            : <NavigationNonAuth />
        }
    </div>

// class Nav extends Component {
//     render() {
//         return (

const NavigationAuth = () =>

    <nav className="navbar navbar-expand-sm navbar-inverse">
        {/* <img id="main-modal" src={MainModal} alt="MainModal" /> */}
        <a className="navbar-brand" href="/"><img id="main-logo" src={MainLogo} alt="Tour Finder Logo" /></a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
     </button>
        <div id="navbarNavDropdown" className="navbar-collapse collapse">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item active" id="available-tours" >
                    <a href="/tours" className="nav-link hvr-fade" >Available Tours <span className="sr-only">(current)</span></a>
                </li>

            </ul>
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link className="nav-link hvr-fade" to="/operator">Tour Dashboard</Link>
                </li>
                <li className="nav-item">
                    <SignOutButton />
                </li>
            </ul>
        </div>
    </nav>

const NavigationNonAuth = () =>

    <nav className="navbar navbar-expand-sm navbar-inverse">
        <a className="navbar-brand" href="/"><img id="main-logo" src={MainLogo} alt="Tour Finder Logo" /></a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className=""><img id="main-modal" src={MainModal} alt="MainModal" /></span>
        </button>
        <div id="navbarNavDropdown" className="navbar-collapse collapse">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item active" id="available-tours" >
                    <a href="/tours" className="nav-link hvr-fade" >Available Tours <span className="sr-only">(current)</span></a>
                </li>
            </ul>
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link className="nav-link hvr-fade" to={routes.SIGN_IN}>Sign In</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link hvr-fade" to={routes.SIGN_UP}>Sign Up</Link>
                </li>
            </ul>
        </div>
    </nav>



export default Navigation;