import React from "react";
import PropTypes from 'prop-types';

class PhotoInput extends React.Component {
// Destructuring the type, className, children and onClick props, applying them to the button element

  render () {

    return (
      <div className="form-group">
        <input className="form-control" {...this.props} />
      </div>
    )
  }
}

PhotoInput.props = {
  name: PropTypes.string,
  placeholder: PropTypes.string
}

export default PhotoInput
