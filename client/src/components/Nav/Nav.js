import React, { Component } from 'react'
// import { Redirect } from 'react-router-dom'
import { Link} from 'react-router-dom'
import axios from 'axios'
import MainLogo from '../../assets/images/main-logo.png'
import MainModal from '../../assets/images/main-modal.png'
import "./Nav.css";

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

    render() {
        const loggedIn = this.props.loggedIn;
        console.log('navbar render, props: ')
        console.log(this.props);

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
                            <a href="/tours" className="nav-link" >Available Tours <span className="sr-only">(current)</span></a>
                        </li>

                    </ul>

                    {loggedIn ? (
                        <section className="navbar-section">
                            <Link to="#" className="btn btn-link text-secondary" onClick={this.logout}>
                                <span className="text-secondary">Logout</span></Link>
                        </section>

                    ) : (
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a className="nav-link" href="/login">Login</a>
                                </li>
                                
                                <li className="nav-item">
                                    <a className="nav-link" href="/signup">Sign Up</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/operator">Operator-Dash</a>
                                </li>
                                <li className="nav-item">
                                <a className="nav-link" href="/profile">Customer-Profile</a>
                                </li>
                            </ul>
                        )}
                </div>
            </nav>
        );
    }
}
        export default Nav;