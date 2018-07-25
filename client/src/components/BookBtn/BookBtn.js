import React from "react";
import PropTypes from 'prop-types';
import "./BookBtn.css";
import { Link } from "react-router-dom";

class BookBtn extends React.Component {
  
  render () {
    return (
      <Link to="/BookNow" className="book-btn btn btn-success btn-block" onClick={this.props.onClick}>
        Book Now
      </Link>
    );
  }
}

BookBtn.props = {
  onClick: PropTypes.func
}

export default BookBtn;
