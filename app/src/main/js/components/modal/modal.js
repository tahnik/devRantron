import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Rant from '../rant/rant';
import { ITEM } from '../../consts/types';

class Modal extends Component {
  getItem() {
    const { theme, vote, item } = this.props;
    switch (item.type) {
      case ITEM.RANT.NAME:
        return <Rant id={item.id} theme={theme} vote={vote} />;
      default:
        return null;
    }
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
  theme: PropTypes.object.isRequired,
  vote: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  close: PropTypes.func.isRequired,
};

export default Modal;
