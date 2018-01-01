import React, { Component } from 'react';
import { SketchPicker, CompactPicker, SliderPicker } from 'react-color';
import PropTypes from 'prop-types';
import Twemoji from 'react-twemoji';
import { THEMES } from '../../consts/types';

class Theme extends Component {
  constructor() {
    super();
    this.state = {
      theme: {
        name: 'Custom Theme',
        id: 'custom_theme',
        backgroundColor: '#54556E',
        item_card: {
          backgroundColor: '#40415A',
          color: 'white',
        },
        comment_card: {
          backgroundColor: '#40415A',
          color: 'white',
        },
        column: {
          backgroundColor: '#54556E',
          width: '450',
        },
        user_badge: {
          details_back: '#54556E',
        },
      },
    };
  }
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
                  Select Me Please!
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
  changeTheme() {
    this.props.changeTheme(null, this.state.theme);
  }
  render() {
    const { theme } = this.state;
    return (
      <div className="theme_container">
        <div className="items_container">
          { this.getThemes() }
        </div>
        <div className="custom_theme">
          <div className="theme_settings">
            <h4>Global</h4>
          </div>
          <div className="theme_settings">
            <h4>Custom</h4>
            <div className="custom_colors">
              <div className="custom_color background_color">
                <span className="color_type">Background Color</span>
                <SliderPicker
                  color={theme.backgroundColor}
                  onChangeComplete={(color) => {
                    this.setState({ theme: { ...theme, backgroundColor: color.hex } });
                    this.changeTheme();
                  }}
                />
                <input
                  onChange={(e) => {
                    this.setState({ theme: { ...theme, backgroundColor: e.target.value } });
                    this.changeTheme();
                  }}
                  value={theme.backgroundColor}
                />
              </div>
              <div className="custom_color rant_color">
                <span className="color_type">Rant Card Background Color</span>
                <SliderPicker
                  color={theme.item_card.backgroundColor}
                  onChangeComplete={(color) => {
                    this.setState({
                      theme: {
                        ...theme,
                        item_card: { ...theme.item_card, backgroundColor: color.hex },
                      },
                    });
                    this.changeTheme();
                  }}
                />
                <input
                  onChange={(e) => {
                    this.setState({
                      theme: {
                        ...theme,
                        item_card: { ...theme.item_card, backgroundColor: e.target.value },
                      },
                    });
                    this.changeTheme();
                  }}
                  value={theme.item_card.backgroundColor}
                />
              </div>
              <div className="custom_color background_color">
                <span className="color_type">Rant Card Text Color</span>
                <SliderPicker
                  color={theme.backgroundColor}
                  onChangeComplete={(color) => {
                    this.setState({ theme: { ...theme, backgroundColor: color.hex } });
                    this.changeTheme();
                  }}
                />
                <input
                  onChange={(e) => {
                    this.setState({ theme: { ...theme, backgroundColor: e.target.value } });
                    this.changeTheme();
                  }}
                  value={theme.backgroundColor}
                />
              </div>
              <div className="custom_color background_color">
                <span className="color_type">Background Color</span>
                <SliderPicker
                  color={theme.backgroundColor}
                  onChangeComplete={(color) => {
                    this.setState({ theme: { ...theme, backgroundColor: color.hex } });
                    this.changeTheme();
                  }}
                />
                <input
                  onChange={(e) => {
                    this.setState({ theme: { ...theme, backgroundColor: e.target.value } });
                    this.changeTheme();
                  }}
                  value={theme.backgroundColor}
                />
              </div>
              <div className="custom_color background_color">
                <span className="color_type">Background Color</span>
                <SliderPicker
                  color={theme.backgroundColor}
                  onChangeComplete={(color) => {
                    this.setState({ theme: { ...theme, backgroundColor: color.hex } });
                    this.changeTheme();
                  }}
                />
                <input
                  onChange={(e) => {
                    this.setState({ theme: { ...theme, backgroundColor: e.target.value } });
                    this.changeTheme();
                  }}
                  value={theme.backgroundColor}
                />
              </div>

            </div>
          </div>
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
