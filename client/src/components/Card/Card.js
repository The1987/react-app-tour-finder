import React from "react";
// import CardBtn from "../CardBtn";
import PropTypes from 'prop-types';
import "./Card.css";

class Card extends React.Component {

  render () {
    const { image, handleBtnClick } = this.props

    return (
      // <div
      //   className="card"
      //   style={{
      //     backgroundImage: image ? `url(${image})` : "none"
      //   }}
      // >
      <div className="card">
      {this.props.children}
        {/* {!image && <i className="fa fa-spinner fa-spin" aria-hidden="true" />} */}
        {/* <CardBtn
          style={{ opacity: image ? 1 : 0 }}
          onClick={handleBtnClick}
          dataValue="pass"
        />
        <CardBtn
          style={{ opacity: image ? 1 : 0 }}
          onClick={handleBtnClick}
          dataValue="pick"
        /> */}
      </div>
    );
  }
}

// Card.propTypes = {
//   image: PropTypes.string,
//   handleBtnClick: PropTypes.func
// }

Card.propTypes - {
  children: PropTypes.node
}

export default Card;