import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Rant from '../rant/rant';

class Modal extends Component {
  getItem() {
    const { item, theme, vote } = this.props;
    return <Rant theme={theme} id={item.id} vote={vote} />;
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
  close: PropTypes.func.isRequired,
  vote: PropTypes.func.isRequired,
};

export default Modal;
