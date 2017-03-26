import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SideNavItem extends Component {
  render() {
    return (
      <Link to={this.props.item.route} className="drawer_item btn" >
        <div className="drawer_icon" >
          <i className={this.props.item.icon} />
        </div>
        <div className="drawer_text" >
          <span>{this.props.item.name}</span>
        </div>
      </Link>
    );
  }
}

export default SideNavItem;
