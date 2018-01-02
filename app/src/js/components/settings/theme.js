import React, { Component } from 'react';
import { SliderPicker } from 'react-color';
import PropTypes from 'prop-types';
import Twemoji from 'react-twemoji';
import { THEMES } from '../../consts/types';

class Theme extends Component {
  constructor() {
    super();
    this.state = {
      sharableTheme: '',
      theme: {
        name: 'Custom Theme',
        id: 'custom_theme',
        backgroundColor: '#54556E',
        item_card: {
          backgroundColor: '#40415A',
          color: '#FFFFFF',
        },
        comment_card: {
          backgroundColor: '#40415A',
          color: '#FFFFFF',
        },
        column: {
          backgroundColor: '#54556E',
          width: '450',
        },
        user_badge: {
          details_back: '#54556E',
        },
        plus_notif: {
          backgroundColor: '#D55161',
        },
      },
    };
  }
  componentWillMount() {
    const { theme } = this.props;
    const sharableTheme = `${theme.backgroundColor}, ${theme.item_card.backgroundColor}, ${theme.item_card.color}, ${theme.comment_card.backgroundColor}, ${theme.comment_card.color}, ${theme.plus_notif.backgroundColor}`;
    this.setState({ theme, sharableTheme });
  }
  componentDidUpdate(prevProps) {
    if (prevProps.theme !== this.props.theme) {
      const { theme } = this.props;
      const sharableTheme = `${theme.backgroundColor}, ${theme.item_card.backgroundColor}, ${theme.item_card.color}, ${theme.comment_card.backgroundColor}, ${theme.comment_card.color}, ${theme.plus_notif.backgroundColor}`;
      /**
       * Under if statement so it's okay to use
       */
      // eslint-disable-next-line
      this.setState({ sharableTheme, theme: this.props.theme });
    }
  }
  handleSharableTheme(values) {
    this.setState({ sharableTheme: values });
    const themeVals = values.replace(' ', '').split(',');
    if (themeVals.length !== 6) {
      return;
    }
    for (let i = 0; i < themeVals.length; i += 1) {
      const isCorrect = /[#]\S{6}/g.test(themeVals[i]);
      if (!isCorrect) {
        return;
      }
    }
    console.log(themeVals);
    this.props.changeTheme(null, {
      name: 'Custom Theme',
      id: 'custom_theme',
      backgroundColor: themeVals[0].replace(' ', ''),
      item_card: {
        backgroundColor: themeVals[1].replace(' ', ''),
        color: themeVals[2].replace(' ', ''),
      },
      comment_card: {
        backgroundColor: themeVals[3].replace(' ', ''),
        color: themeVals[4].replace(' ', ''),
      },
      column: {
        backgroundColor: '#54556E',
        width: '450',
      },
      user_badge: {
        details_back: '#54556E',
      },
      plus_notif: {
        backgroundColor: themeVals[5].replace(' ', ''),
      },
    });
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
        key={key}
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
                  {selectedTheme.name}
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
      <div
        className="theme_container"
        style={{ backgroundColor: theme.item_card.backgroundColor, color: theme.item_card.color }}
      >
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
              <div className="custom_color">
                <span className="color_type">Background</span>
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
              <div className="custom_color">
                <span className="color_type">Rant Card Background</span>
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
              <div className="custom_color">
                <span className="color_type">Rant Card Text</span>
                <SliderPicker
                  color={theme.item_card.color}
                  onChangeComplete={(color) => {
                    this.setState({
                      theme: {
                        ...theme,
                        item_card: { ...theme.item_card, color: color.hex },
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
                        item_card: { ...theme.item_card, color: e.target.value },
                      },
                    });
                    this.changeTheme();
                  }}
                  value={theme.item_card.color}
                />
              </div>
              <div className="custom_color">
                <span className="color_type">Comment Card Background</span>
                <SliderPicker
                  color={theme.comment_card.backgroundColor}
                  onChangeComplete={(color) => {
                    this.setState({
                      theme: {
                        ...theme,
                        comment_card: { ...theme.comment_card, backgroundColor: color.hex },
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
                        comment_card: { ...theme.comment_card, backgroundColor: e.target.value },
                      },
                    });
                    this.changeTheme();
                  }}
                  value={theme.comment_card.backgroundColor}
                />
              </div>
              <div className="custom_color">
                <span className="color_type">Comment Card Text</span>
                <SliderPicker
                  color={theme.comment_card.color}
                  onChangeComplete={(color) => {
                    this.setState({
                      theme: {
                        ...theme,
                        comment_card: { ...theme.comment_card, color: color.hex },
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
                        comment_card: { ...theme.comment_card, color: e.target.value },
                      },
                    });
                    this.changeTheme();
                  }}
                  value={theme.comment_card.color}
                />
              </div>
              <div className="custom_color background_color">
                <span className="color_type">PlusPlus and Notifs</span>
                <SliderPicker
                  color={theme.plus_notif.backgroundColor}
                  onChangeComplete={(color) => {
                    this.setState({
                      theme: {
                        ...theme,
                        plus_notif: { ...theme.plus_notif, backgroundColor: color.hex },
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
                        plus_notif: { ...theme.plus_notif, backgroundColor: e.target.value },
                      },
                    });
                    this.changeTheme();
                  }}
                  value={theme.plus_notif.backgroundColor}
                />
              </div>
            </div>

            <div className="sharable_string">
              <span className="sharable_title">Sharable theme string</span>
              <input
                onChange={e => this.handleSharableTheme(e.target.value)}
                value={this.state.sharableTheme}
              />
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
