import React from 'react';
import PropTypes from 'prop-types';

const Text = props => (
  <div className="setting textarea">
    <span className="setting_label">{props.setting.text}</span>
    <div className="setting_option">
      <input
        onChange={e => props.handleChange(e.target.value)}
        placeholder={props.setting.placeholder}
      />
    </div>
  </div>
);

Text.propTypes = {
  setting: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Text;
