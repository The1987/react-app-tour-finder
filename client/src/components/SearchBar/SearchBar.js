import React from "react";
import "./SearchBar.css";

const SearchBar = () =>

<div className="search-all">
        <form className="search-bar">
        <h2>Find Your H<i className="far fa-xs fa-smile-beam"></i>ppy Place</h2> <br />
            <input className="search" type="search" placeholder="Enter a City, State, or Zipcode" />
            <button className="submit" type="submit"><i className="fas fa-search"></i></button>
        </form>
</div>


export default SearchBar;
