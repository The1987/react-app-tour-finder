import React from "react";
import "./List.css";
import PropTypes from 'prop-types';

class List extends React.Component {

  render() {

    return (
      <div className="list-overflow-container">
        <div className="list-group">
          {this.props.children}
        </div>
      </div>
    );
  }
}

List.props = {
  children: PropTypes.node
}

export default List;

