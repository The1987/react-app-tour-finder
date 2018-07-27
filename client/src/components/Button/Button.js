import React from "react";
import PropTypes from "prop-types";
import "./Button.css";
import BookBtn from "../BookBtn";

class BookBtn extends React.Component {
    render() {
        const { handleBtnClick } = this.props

        return (
            <div className="button">
            <BookBtn onClick={handleBtnClick} dataValue="isPurchased"/>
            </div>
        );
    }
}

BookBtn.propTypes = {
    handleBtnClick: PropTypes.func
}

export default BookBtn;