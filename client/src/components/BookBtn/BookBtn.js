import React from "react";
import PropTypes from 'prop-types';
import "./BookBtn.css";

class BookBtn extends React.Component {
  
  render () {
    return (
      <button className="book-btn btn btn-success btn-block" onClick={this.props.onClick}>
        Book Now
      </button>
    );
  }
}

BookBtn.props = {
  onClick: PropTypes.func
}

export default BookBtn;
