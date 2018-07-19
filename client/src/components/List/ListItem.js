import React from "react";

import PropTypes from 'prop-types';

class ListItem extends React.Component {

  render () {

    return (
     

      <div className="list-group-item">
        <li>{this.props.children}</li>
      </div>
      
      
    )
  }
}

ListItem.props = {
  children: PropTypes.node
}

export default ListItem;
