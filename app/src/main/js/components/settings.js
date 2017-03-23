import React, { Component } from 'react';
import ToggleableSettings from '../containers/toggleable_settings';

/* Ignore esling error for now. More stuff will be added later */
class Settings extends Component {
  render() {
    return (
      <div className="rants center">
        <ToggleableSettings />
      </div>
    );
  }
}

export default Settings;
