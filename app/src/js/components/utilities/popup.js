import React from 'react';

const Popup = (props) => {
  if (!props.visible) {
    return false;
  }
  return (
    <div className="popup_container">
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

export default Popup;
