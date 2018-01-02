import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Items extends Component {
  constructor() {
    super();
    this.state = {
      hovering: false,
    };
  }
  render() {
    const {
      item, onClick, className, active, theme,
    } = this.props;
    const { hovering } = this.state;
    return (
      <div
        className={`item ${className} ${active}`}
        onClick={() => onClick()}
        onMouseEnter={() => { this.setState({ hovering: true }); }}
        onMouseLeave={() => { this.setState({ hovering: false }); }}
        style={{
          backgroundColor: active || hovering ?
          theme.backgroundColor : theme.item_card.backgroundColor,
          color: theme.item_card.color,
        }}
      >
        <i className={item.icon} />{ item.name }
      </div>
    );
  }
}

Items.propTypes = {
  item: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  active: PropTypes.string,
};

export default Items;
