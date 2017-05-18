import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Item from '../item/item';

class Modal extends Component {
  getItem() {
    const { item, theme, vote, auth } = this.props;
    return <Item theme={theme} id={item.id} vote={vote} auth={auth} />;
  }
  render() {
    const { close } = this.props;
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
  item: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  close: PropTypes.func.isRequired,
  vote: PropTypes.func.isRequired,
};

export default Modal;
