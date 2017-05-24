import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Item from '../item/item';

class Modal extends Component {
  getItem() {
    const { item, theme, vote, auth } = this.props;
    return <Item theme={theme} cardItem={item} vote={vote} auth={auth} />;
  }
  render() {
    const { item, close } = this.props;
    if (!item) {
      return null;
    }
    return (
      <div className="modal_container">
        <div className="close_modal" onClick={() => close()}>
          <i className="ion-close-round" />
        </div>
        { this.getItem() }
      </div>
    );
  }
}

Modal.propTypes = {
  item: PropTypes.object, //eslint-disable-line
  theme: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  close: PropTypes.func.isRequired,
  vote: PropTypes.func.isRequired,
};

export default Modal;
