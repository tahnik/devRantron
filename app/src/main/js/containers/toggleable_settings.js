import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeStyle } from '../actions/style_actions';
import { DARK_THEME, LIGHT_THEME } from '../actions/style_actions';

class ToggleableSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      darkTheme: true,
    };
  }
  onThemeChange(event) {
    if(this.state.darkTheme) {
      this.props.changeStyle(LIGHT_THEME);
    } else {
      this.props.changeStyle(DARK_THEME);
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
              <input onChange={event => this.onThemeChange(event)} type="checkbox" />
              <span className="lever" />
              Light
            </label>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { changeStyle })(ToggleableSettings);
