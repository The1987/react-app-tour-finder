import React from "react";
import "./Nav.css";

const Nav = () =>

  //  <nav class="navbar-inverse  navbar navbar-expand-lg navbar-nav">
  //   <a class="navbar-brand" href="/">TourFinder</a>
  //   <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
  //      <span class="navbar-toggler-icon"></span> 
  //   </button>
  //   <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
  //     <div class="navbar-nav">
  //       <a class="navbar-brand nav-link" href="/tours">Available Tours</a>
  //       <a class="navbar-brand nav-link" href="/login">Login | Sign Up</a>
  //       <a class="navbar-brand nav-link" href="/operator">Tour Operator</a>
  //     </div>
  //   </div>
  // </nav>;

  <nav className="navbar-inverse navbar navbar-expand-md">

    <a className="navbar-brand text-white" href="/">Tour Finder</a>

    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item active">
          <a className="nav-link text-white" href="/tours">Availiable Tours</a>
        </li>
        <li className="nav-item active">
          <a className="nav-link text-white" href="/operator">Dashboard</a>
        </li>
      </ul>
    </div>

    <div className="collapse navbar-collapse text-right navbarNav">
      <ul>
        <li className="nav-item active">
          <a className="nav-link text-white" href="/login">Login | Sign Up</a>
        </li>
      </ul>
    </div>

    <div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Dropdown
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
    <button class="dropdown-item" type="button">Action</button>
    <button class="dropdown-item" type="button">Another action</button>
    <button class="dropdown-item" type="button">Something else here</button>
  </div>
  
</div>

  </nav>;




export default Nav;
