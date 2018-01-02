import React from 'react';
import PropTypes from 'prop-types';

const Items = ({
  item, onClick, className, active, theme,
}) => (
  <div
    className={`item ${className} ${active}`}
    onClick={() => onClick()}
    style={{ backgroundColor: theme.item_card.backgroundColor }}
  >
    <i className={item.icon} />{ item.name }
  </div>
);

Items.propTypes = {
  item: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  active: PropTypes.string,
};

export default Items;
