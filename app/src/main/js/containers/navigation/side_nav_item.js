import React from 'react';
import { Link } from 'react-router-dom';

function SideNavItem(props) {
  return (
    <Link to={props.item.route} className="drawer_item btn" >
      <div className="drawer_icon" >
        <i className={props.item.icon} />
      </div>
      <div className="drawer_text" >
        <span>{props.item.name}</span>
      </div>
    </Link>
  );
}

SideNavItem.propTypes = {
  item: React.PropTypes.object.isRequired,
};

export default SideNavItem;
