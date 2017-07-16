import React, { Component } from 'react';
import PropTypes from 'prop-types';
import General from './general';
import Theme from './theme';

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
    const { activeNav } = this.state;
    const { settings, changeGeneral } = this.props;
    if (activeNav === SETTINGS_NAV[0]) {
      return (
        <General general={settings.general} changeGeneral={changeGeneral} />
      );
    } else if (activeNav === SETTINGS_NAV[1]) {
      return <Theme />;
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
                onClick={() => this.setState({ activeNav: nav })}
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
  settings: PropTypes.object.isRequired,
  changeGeneral: PropTypes.func.isRequired,
};

export default Items;
