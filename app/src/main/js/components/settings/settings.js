import React, { Component } from 'react';
import PropTypes from 'prop-types';
import General from './general';

const SETTINGS_NAV = [
  'General',
  'Theme',
];

class Items extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeNav: SETTINGS_NAV[0],
    };
  }
  getSettings() {
    if (this.activeNav === SETTINGS_NAV[0]) {
      return <General />;
    }
    return <General />;
  }
  render() {
    const { activeNav } = this.state;
    return (
      <div className="settings">
        <div className="top_nav">
          { SETTINGS_NAV.map(
              nav => (<div
                className={`nav ${activeNav === nav ? 'active' : ''}`}
                key={nav}
              >{nav}</div>),
            )
          }
        </div>
        <div className="settings_container">
          { this.getSettings() }
        </div>
      </div>
    );
  }
}

Items.propTypes = {
};

export default Items;
