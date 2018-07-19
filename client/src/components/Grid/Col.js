import React from "react";
import PropTypes from 'prop-types';

class Col extends React.Component {

  render () {
    const { size, children } = this.props

    const klass = size.split(" ").map(size => "col-" + size).join(" ");

    return (
      <div className={klass}> 
          {children}
      </div>
    );
  }
};

Col.props = {
  size: PropTypes.string,
  children: PropTypes.node
}

export default Col;