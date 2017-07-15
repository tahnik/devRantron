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
      activeNav: '',
    };
  }
  getSettings() {
    if (this.activeNav === SETTINGS_NAV[0]) {
      return <General />;
    }
    return <General />;
  }
  render() {
    return (
      <div className="settings">
        <div className="top_nav">
          { SETTINGS_NAV.map(nav => (<div className="nav" key={nav}>{nav}</div>))}
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
