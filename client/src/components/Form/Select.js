import React from "react";
import PropTypes from 'prop-types';

class Select extends React.Component {
// Destructuring the type, className, children and onClick props, applying them to the button element

  render () {

    return (
      <div className="form-group">
        <select className="form-control" {...this.props} />
      </div>
    )
  }
}

Select.props = {
  name: PropTypes.string,
  placeholder: PropTypes.string
}

export default Select
