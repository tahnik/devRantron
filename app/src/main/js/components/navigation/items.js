import React from 'react';
import PropTypes from 'prop-types';

const Items = ({ item, onClick, active }) => (
  <div className={`item ${active}`} onClick={() => onClick()} >
    <i className={item.icon} />{ item.name }
  </div>
);

Items.propTypes = {
  item: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  active: PropTypes.string, //eslint-disable-line
};

export default Items;
