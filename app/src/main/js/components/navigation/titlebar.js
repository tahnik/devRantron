import React from 'react';
import PropTypes from 'prop-types';

export default function TitleBar(props) {
  return (
    <div id="titlebar">
      <i className="ion-arrow-move" />
      <i className="no-drag ion-minus-round" onClick={() => props.minimize()} />
      <i className="no-drag ion-ios-photos" onClick={() => props.maximize()} />
      <i className="no-drag ion-close-round" onClick={() => props.close()} />
    </div>
  );
}

TitleBar.propTypes = {
  minimize: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  maximize: PropTypes.func.isRequired,
};
