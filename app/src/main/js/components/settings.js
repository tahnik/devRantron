import React from 'react';
import ToggleableSettings from '../containers/settings/toggleable_settings';
import { connect } from 'react-redux';
import { routeAction } from '../actions/route';

function Settings(props) {
  props.updateRoute(props.match.url);
  return (
    <div className="main_container">
      <ToggleableSettings />
    </div>
  );
}

const mapDispatchToProps = {
  updateRoute: routeAction
}

export default connect(null, mapDispatchToProps)(Settings);
