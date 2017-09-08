import React from 'react';
import PropTypes from 'prop-types';

const Slider = props => (
  <div className="setting slider" onClick={() => props.handleChange()}>
    <span className="setting_label">{props.setting.text}</span>
    <div className="setting_option">
      <input type="range" min="-2" max="2" step="0.25" />
    </div>
  </div>
);

Slider.propTypes = {
  setting: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Slider;
