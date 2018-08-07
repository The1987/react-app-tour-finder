import React from "react";
import "./SearchBar.css";

const SearchBar = () =>

<div className="search-all">
        <form className="search-bar">
        {/* <h2>Travel Locally. Explore Globally.</h2> */}
        <h2 className="main-tagline">find your happy place.</h2>

            <input className="search main-search" type="search" placeholder="Enter a City, State, or Zipcode" />
            <button className="submit" type="submit"><i className="fas fa-map-marker-alt"></i></button>

        </form>
</div>



export default SearchBar;
