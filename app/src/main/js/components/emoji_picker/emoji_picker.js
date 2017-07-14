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
    if (this.state.search.length > 1 && this.state.search !== this.state.prevSearch) {
      const query = this.state.search;
      emojiData.search = allEmojis.filter(d => d.description.toLowerCase().indexOf(query) > -1);
      this.setState({ activeTab: 'search', prevSearch: query });
    } else if (this.state.search.length === 0 && this.state.activeTab === 'search') {
      this.setState({ activeTab: 'people' });
    }
    return (
      <div className="emoji_picker">
        <div className="emoji_top">
          <div className="categories">
            {emojiData.categories.map(object => (
              <Twemoji
                onClick={() => { this.setState({ activeTab: object.name }); }}
                className="category"
              >{object.icon}</Twemoji>
              ))}
          </div>
          <input
            className="emoji_search"
            type="text"
            placeholder="Search"
            onChange={(e) => { this.setState({ search: e.target.value }); }}
          />
        </div>

        <p className="active_emoji_tab">{this.state.activeTab}</p>

        <div className="emoji_list">
          {emojiData[this.state.activeTab].map(object => (
            <Twemoji
              className="emoji_wrapper"
              key={object.description}
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
};

export default EmojiPicker;
