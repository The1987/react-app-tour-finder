import React from "react";
import "./Nav.css";

const Nav = () =>

<nav class="navbar-inverse  navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="/">TourFinder</a>
  {/* <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
     <span class="navbar-toggler-icon"></span> 
  </button> */}
  <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div class="navbar-nav">
      <a class="navbar-brand nav-link" href="/tours">Available Tours</a>
      <a class="navbar-brand nav-link" href="/login">Login | Sign Up</a>
      <a class="navbar-brand nav-link" href="/operator">Tour Operator</a>
    </div>
  </div>
</nav>;

  




export default Nav;
