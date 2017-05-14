import React from 'react';
import PropTypes from 'prop-types';

const Items = ({ item, onClick }) => (
  <div className="item" onClick={() => onClick()} >
    <i className={item.icon} />{ item.name }
  </div>
);

Items.propTypes = {
  item: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Items;
