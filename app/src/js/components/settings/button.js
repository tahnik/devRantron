import React from 'react';
import PropTypes from 'prop-types';

const Button = props => (
  <div className="setting button">
    <span className="setting_label">{props.setting.text}</span>
    <div className="setting_option">
      <button
        onClick={() => props.handleChange()}
        disabled={!props.setting.value}
      >{props.setting.buttonText}
      </button>
    </div>
  </div>
);

Button.propTypes = {
  setting: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Button;
