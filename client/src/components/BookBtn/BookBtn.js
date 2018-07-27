import React from "react";
import PropTypes from 'prop-types';
import "./BookBtn.css";
import { Link } from "react-router-dom";
// import Detail from "../../pages/Detail";

class BookBtn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: {}
    };
  }



  render() {
    const { onClick } = this.props

    return (

      <Link to={`tours/BookNow/${this.state.books._id}`} className="book-btn btn btn-success btn-block" onClick={onClick} key={this.state.books._id}>
        Book Now
      </Link>
    );
  }
}


BookBtn.props = {
  onClick: PropTypes.func,
  // dataValue: PropTypes.string,
  // style: PropTypes.object
}

export default BookBtn;
