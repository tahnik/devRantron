import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Twemoji from 'react-twemoji';
import emojiData from './emojis.json';

const categoryImages = {
  people: '😀',
  nature: '🍂',
  'food-drink': '🍔',
  activity: '🏈',
  'travel-places': '✈',
  objects: '💡',
  symbols: '❤',
  flags: '🇸🇪',
};

const allEmojis = [];

// Usage: <EmojiPicker onPick={(emoji)=>{console.log(emoji)}}/>

class EmojiPicker extends Component {
  constructor(props) {
    super(props);
    this.state = { activeTab: 'people', search: '' };
  }
  componentWillMount() {
    emojiData.categories = [];
    Object.keys(emojiData).forEach((key) => {
      if (key !== 'categories') {
        emojiData.categories.push({ name: key, icon: categoryImages[key] });
        for (let i = 0; i < emojiData[key].length; i += 1) {
          allEmojis.push(emojiData[key][i]);
        }
      }
    });
  }
  pickEmoji(emojChar) {
    if (this.props.onPick === undefined) {
      return false;
    }
    this.props.onPick(emojChar);
    return true;
  }
  render() {
    return (
      <div className="emoji_picker" style={this.props.style}>
        <div className="emoji_top">
          <div className="categories">
            {emojiData.categories.map(object => (
              <Twemoji
                onClick={() => { this.setState({ activeTab: object.name }); }}
                key={object.name}
                className="category"
              >{object.icon}</Twemoji>
              ))}
          </div>
        </div>

        <p className="active_emoji_tab">{this.state.activeTab}</p>

        <div className="emoji_list">
          {emojiData[this.state.activeTab].map(object => (
            <Twemoji
              className="emoji_wrapper"
              key={object.character}
              onClick={() => { this.pickEmoji(object.character); }}
            >
              {object.character}
            </Twemoji>
            ))}
        </div>
      </div>
    );
  }
}

EmojiPicker.propTypes = {
  onPick: PropTypes.func, //eslint-disable-line
  style: PropTypes.object, //eslint-disable-line
};

export default EmojiPicker;
