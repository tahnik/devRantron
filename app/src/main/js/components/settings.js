import React from 'react';
import { connect } from 'react-redux';
import ToggleableSettings from '../containers/settings/toggleable_settings';
import { blankNav } from '../actions/nav';

function Settings(props) {
  props.blankNav();
  return (
    <div className="main_container">
      <ToggleableSettings />
    </div>
  );
}

Settings.propTypes = {
  blankNav: React.PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  blankNav,
};

export default connect(null, mapDispatchToProps)(Settings);
