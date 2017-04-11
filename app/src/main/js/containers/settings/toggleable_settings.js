import React, { Component } from 'react';
import { connect } from 'react-redux';
import changeStyle from '../../actions/settings';
import { THEME_TYPE } from '../../consts/settings';

class ToggleableSettings extends Component {
  getThemeState() {
    return this.props.theme === THEME_TYPE.DARK_THEME;
  }
  onThemeChange() {
    console.log("Sorry")
    if (this.getThemeState()) {
      this.props.changeStyle(THEME_TYPE.LIGHT_THEME);
    } else {
      this.props.changeStyle(THEME_TYPE.DARK_THEME);
    }
  }
  render() {
    return (
      <div className="toggleable_settings">
        <div className="switch">
          <span className="switch_span" >Use Dark Theme</span>
          <label>
            No
            <input checked={this.getThemeState()} onChange={() => this.onThemeChange()} type="checkbox" />
            <span className="lever" />
            Yes
          </label>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    theme: state.theme,
  };
}

export default connect(mapStateToProps, { changeStyle })(ToggleableSettings);
