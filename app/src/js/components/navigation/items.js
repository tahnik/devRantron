import React from 'react';
import PropTypes from 'prop-types';

const Items = ({
  item, onClick, className, active,
}) => (
  <div className={`item ${className} ${active}`} onClick={() => onClick()} >
    <i className={item.icon} />{ item.name }
  </div>
);

Items.propTypes = {
  item: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  active: PropTypes.string,
};

export default Items;
