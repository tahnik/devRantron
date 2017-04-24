import React, { Component } from 'react';
import { connect } from 'react-redux';
import ToggleableSettings from '../containers/settings/toggleable_settings';
import { blankNav } from '../actions/nav';

class Settings extends Component {
  componentWillMount() {
    this.props.blankNav();
  }
  render() {
    return (
      <div className="main_container">
        <ToggleableSettings />
      </div>
    );
  }
}

Settings.propTypes = {
  blankNav: React.PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  blankNav,
};

export default connect(null, mapDispatchToProps)(Settings);
