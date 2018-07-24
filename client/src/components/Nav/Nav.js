import React from "react";
import "./Nav.css";

const Nav = () =>

    <nav className="navbar navbar-expand-sm navbar-inverse">
        <a className="navbar-brand text-white" href="/">Tour Finder</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div id="navbarNavDropdown" className="navbar-collapse collapse">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                    <a className="nav-link text-white" href="/tours">Availiable Tours <span className="sr-only">(current)</span></a>
                </li>
                {/* <li className="nav-item">
                    <a className="nav-link" href="#">Features</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Pricing</a>
                </li> */}

            </ul>
            <ul className="navbar-nav">
                {/* <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="http://example.com" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Dropdown
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        <a className="dropdown-item" href="#">Action</a>
                        <a className="dropdown-item" href="#">Another action</a>
                    </div>
                </li> */}
                <li className="nav-item">
                    <a className="nav-link text-white" href="/login">Login</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link text-white" href="/login">Register</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link text-white" href="/operator">Dashboard</a>
                </li>
            </ul>
        </div>
    </nav>;



export default Nav;
