import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeStyle } from '../../actions/settings';
import { THEME_TYPE } from '../../consts/settings';

class ToggleableSettings extends Component {

  getThemeState() {
    return this.props.theme === THEME_TYPE.DARK_THEME;
  }

  onThemeChange() {
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
          <label htmlFor="change_theme" >
            No
            <input
              id="change_theme"
              checked={this.getThemeState()}
              onChange={() => this.onThemeChange()} type="checkbox"
            />
            <span className="lever" />
            Yes
          </label>
        </div>
      </div>
    );
  }
}

ToggleableSettings.propTypes = {
  theme: React.PropTypes.string.isRequired,
  changeStyle: React.PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    theme: state.theme,
  };
}

export default connect(mapStateToProps, { changeStyle })(ToggleableSettings);
