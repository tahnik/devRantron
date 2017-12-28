import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Twemoji from 'react-twemoji';
import { timeSince } from '../../consts/utils';
import { THEMES } from '../../consts/types';

class Theme extends Component {
  getTheme(key) {
    const { theme } = this.props;
    const selectedTheme = THEMES[key];
    if (key === theme.id.toUpperCase()) {
      // selectedTheme = THEMES[theme.id.toUpperCase()];
    }
    return (
      <div
        className="item_container"
        style={{
          backgroundColor: selectedTheme.backgroundColor,
        }}
        onClick={() => { this.props.changeTheme(key); }}
      >
        <div
          className={`item_card ${1 ? null : 'shadow'}`}
          id={1010101}
          style={{
              backgroundColor: selectedTheme.item_card.backgroundColor,
              color: selectedTheme.item_card.color,
              width: `${selectedTheme.column.width}px`,
            }}
        >
          <span
            className="timesince"
          >{timeSince(1514319457 * 1000)}
          </span>
          <div
            className="body_container"
            onClick={() => this.open()}
          >
            <div
              className="top_container"
            >
              <Twemoji>
                <span
                  className="body"
                >
                  Bro ipsum dolor sit amet sucker hole heli granny gear, newschooler McTwist cruiser wheelie drop taco mitt. Bomb hole Skate avie carve grind line. Bro clipless table top whip glades pow pow poaching avie wack. 180 wheelie corduroy table top schwag shred.
                  Chillax flow pow pow steeps granny gear. Crank grind rigid sketching. Manny hero stomp bowl rock roll, pinner granny gear dust on crust reverse camber hardtail. Clean air avie euro death cookies, face shots japan air brain bucket sketching presta.
                  Death cookies first tracks ski bum T-bar 360. Wheelie deck afterbang rail table top gapers. Whistler nose dust on crust stoked pipe endo. Heli pow rock roll, schwag sketching gaper noodle road rash laps free ride gnar gnar frozen chicken heads rigid avie.
                </span>
              </Twemoji>
            </div>
          </div>
        </div>
      </div>
    );
  }
  getThemes() {
    return Object.keys(THEMES).map(key => this.getTheme(key));
  }
  render() {
    return (
      <div className="theme_container">
        <div className="items_container">
          { this.getThemes() }
        </div>
        <div className="custom_theme">
          <h4>Global</h4>
        </div>
      </div>
    );
  }
}

Theme.propTypes = {
  theme: PropTypes.object.isRequired,
  changeTheme: PropTypes.func.isRequired,
};

export default Theme;
