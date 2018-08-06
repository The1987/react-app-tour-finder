-import React, { Component } from 'react'
// import { Redirect } from 'react-router-dom'
import { Link} from 'react-router-dom'
import axios from 'axios'
import MainLogo from '../../assets/images/main-logo.png'
import MainModal from '../../assets/images/main-modal.png'
// import React, { Component } from 'react'
import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import MainLogo from '../../assets/images/main-logo.png';
import MainModal from '../../assets/images/main-modal.png';
import "./Nav.css";
import * as routes from '../../constants/routes';
import SignOutButton from '../SignOut';

class Nav extends Component {
    constructor() {
        super()
        this.logout = this.logout.bind(this)
    }

    logout(event) {
        event.preventDefault()
        console.log('logging out')
        axios.post('/user/logout').then(response => {
            console.log(response.data)
            if (response.status === 200) {
                this.props.updateUser({
                    loggedIn: false,
                    username: null
                })
            }
        }).catch(error => {
            console.log('Logout error')
        })
    }
const Navigation = ({ authUser }) =>
    <div>
        {authUser
            ? <NavigationAuth />
            : <NavigationNonAuth />
        }
    </div>

    render() {
        const loggedIn = this.props.loggedIn;
        console.log('navbar render, props: ')
        console.log(this.props);
// class Nav extends Component {
//     render() {
//         return (

        return (
  
            <nav className="navbar navbar-expand-sm navbar-inverse">
            <img id="main-modal" src={MainModal} alt="MainModal" />
                <a className="navbar-brand"  href="/"><img id="main-logo" src={MainLogo} alt="Tour Finder Logo"/></a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div id="navbarNavDropdown" className="navbar-collapse collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active" id="available-tours" >
                            <a href="/tours" className="nav-link hvr-fade" >Available Tours <span className="sr-only">(current)</span></a>
                        </li>
const NavigationAuth = () =>

                    </ul>
    <nav className="navbar navbar-expand-sm navbar-inverse">
        <img id="main-modal" src={MainModal} alt="MainModal" />
        <a className="navbar-brand" href="/"><img id="main-logo" src={MainLogo} alt="Tour Finder Logo" /></a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div id="navbarNavDropdown" className="navbar-collapse collapse">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item active" id="available-tours" >
                    <a href="/tours" className="nav-link hvr-fade" >Available Tours <span className="sr-only">(current)</span></a>
                </li>

                    {loggedIn ? (
                        <section className="navbar-section">
                            <Link to="#" className="btn btn-link text-secondary hvr-fade" onClick={this.logout}>
                                <span className="text-secondary">Logout</span></Link>
                        </section>
            </ul>
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link className="nav-link" to="/operator">Operator-Dash</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to={routes.SIGN_IN}>Sign In</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link hvr-fade" to={routes.SIGN_UP}>Sign Up</Link>
                </li>
                <li className="nav-item">
                    <SignOutButton />
                </li>
            </ul>
        </div>
    </nav>

                    ) : (
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a className="nav-link hvr-fade" href="/login">Login</a>
                                </li>
                                
                                <li className="nav-item">
                                    <a className="nav-link hvr-fade" href="/signup">Sign Up</a>
                                </li>
                                <li className="nav-item">
const NavigationNonAuth = () =>

                                    <a className="nav-link" href="/operator">Operator-Dash</a>
                                </li>
                                <li className="nav-item">
                                <a className="nav-link" href="/profile">Customer-Profile</a>
    <nav className="navbar navbar-expand-sm navbar-inverse">
        <img id="main-modal" src={MainModal} alt="MainModal" />
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
                    <Link className="nav-link" to={routes.SIGN_IN}>Sign In</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to={routes.SIGN_UP}>Sign Up</Link>
                </li>
            </ul>
        </div>
    </nav>

                                </li>
                            </ul>
                        )}
                </div>
            </nav>
        );
    }
}
        export default Nav;


export default Navigation;