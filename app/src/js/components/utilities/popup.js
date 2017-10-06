import React from 'react';
import PropTypes from 'prop-types';

const Popup = (props) => {
  if (!props.visible) {
    return false;
  }
  return (
    <div className={`popup_container ${props.className}`}>
      <div className="popup">
        <span className="title">
          { props.body }
        </span>
        <div className="actions">
          <button onClick={() => props.onPos()}>{ props.pos }</button>
          <button onClick={() => props.onNeg()} >{ props.neg }</button>
        </div>
      </div>
    </div>
  );
};

Popup.propTypes = {
  visible: PropTypes.bool.isRequired,
  className: PropTypes.string,
  body: PropTypes.string.isRequired,
  onPos: PropTypes.func.isRequired,
  onNeg: PropTypes.func.isRequired,
  pos: PropTypes.string.isRequired,
  neg: PropTypes.string.isRequired,
};

export default Popup;
