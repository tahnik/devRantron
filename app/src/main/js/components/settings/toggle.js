import React from 'react';
import PropTypes from 'prop-types';

const Toggle = props => (
  <div className="setting toggle">
    <span className="setting_label">{props.setting.text}</span>
    <div className="setting_option">
      <label className="switch" htmlFor={props.setting.text}>
        <input
          className="toggle_input"
          type="checkbox"
          checked={props.setting.value}
          readOnly
        />
        <span
          onClick={() => props.handleChange()}
          className="slider"
        />
      </label>
    </div>
  </div>
);

Toggle.propTypes = {
  setting: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Toggle;
