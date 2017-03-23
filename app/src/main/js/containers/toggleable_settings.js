import React, { Component } from 'react';
import { connect } from 'react-redux';
import changeStyle from '../actions/styles';
import { THEME_TYPE } from '../consts/styles';

class ToggleableSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      darkTheme: true,
    };
  }
  onThemeChange() {
    if (this.state.darkTheme) {
      changeStyle(THEME_TYPE.LIGHT_THEME);
    } else {
      changeStyle(THEME_TYPE.DARK_THEME);
    }
    this.setState({ darkTheme: !this.state.darkTheme });
  }
  render() {
    return (
      <div className="toggleable_settings">
        <div>
          <div className="switch">
            <label>
              Dark
              <input onChange={() => this.onThemeChange()} type="checkbox" />
              <span className="lever" />
              Light
            </label>
          </div>
        </div>
      </div>
    );
  }
}

export default ToggleableSettings;
