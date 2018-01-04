import React from 'react';
import PropTypes from 'prop-types';

const Toggle = props => (
  <div className="setting toggle" onClick={() => props.handleChange()}>
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
          className="slider"
          style={{
            backgroundColor: props.theme.plus_notif ?
                      props.theme.plus_notif.backgroundColor : props.theme.backgroundColor,
          }}
        />
      </label>
    </div>
  </div>
);

Toggle.propTypes = {
  setting: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Toggle;
