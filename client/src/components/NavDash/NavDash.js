import React, { Component } from 'react'
// import { Redirect } from 'react-router-dom'
// import { Link} from 'react-router-dom'
import axios from 'axios'
import "./NavDash.css";

class NavDash extends Component {
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
        return (
            <nav className="navbar navbar-expand-sm">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div id="navbarNavDropdown" className="navbar-collapse collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a href="" className="nav-link text-white" >Hello Chris</a>
                        </li>
                        <li className="nav-item active">
                            <a href="" className="nav-link text-white" >Nav1</a>
                        </li>
                        <li className="nav-item active">
                            <a href="" className="nav-link text-white" >Nav2</a>
                        </li>
                        <li className="nav-item active">
                            <a href="" className="nav-link text-white" >Nav3</a>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}
        export default NavDash;