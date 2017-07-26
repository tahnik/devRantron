import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TwemojiComp from 'react-twemoji';
import Twemoji from 'twemoji';
import EmojiPicker from '../emoji_picker/emoji_picker';

let active = false;
let pos = 0;

class ContentEditable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pickerActive: false,
      content: '',
      previewContent: '',
      pickerStyle: {
        bottom: '5px',
        right: '0px',
      },
      mentions: [],
    };
  }
  shouldComponentUpdate() {
    return true;
  }
  componentDidUpdate() {
    const cursor = document.getElementById('cursor');
    const mentions = document.getElementById('mentions');
    let scrollOffset = this.textarea.scrollTop;
    if (scrollOffset <= 20) { scrollOffset = 0; }
    if (mentions && cursor) {
      mentions.style.bottom = `${parseInt(window.getComputedStyle(cursor).bottom, 10) + scrollOffset}px`;
      mentions.style.left = `${parseInt(window.getComputedStyle(cursor).left, 10) + 5}px`;
    }
  }
  onChange(value) {
    this.buildMentions(value);
    this.setState({ content: value });
    let content = value;
    let caretPos = 0;
    if (this.textarea) {
      caretPos = this.textarea.selectionStart;
    }
    this.previewNode.scrollTop = this.textarea.scrollTop;
    content = content.substr(0, caretPos);
    content = ContentEditable.moveCaret(content, caretPos);
    this.setState({ previewContent: content });
  }
  buildMentions(text) {
    const lastChar = text.slice(-1);
    const { users } = this.props;
    if (lastChar === ' ' || lastChar === '') {
      active = false;
      pos = 0;
    }
    if (lastChar === '@') {
      pos = text.length;
      active = true;
    }
    const mentions = new Set();
    if (active) {
      const searchText = text.substring(pos, text.length);
      const searchTextArray = Array.from(searchText); // Thanks ES6
      if (searchTextArray.length === 0) {
        mentions.add(users);
      } else {
        for (let i = 0; i < users.length; i += 1) {
          let candidate = true;
          for (let j = 0; j < searchTextArray.length; j += 1) {
            if (users[i].indexOf(searchTextArray[j]) === -1) {
              candidate = false;
            }
          }
          if (candidate) {
            mentions.add(users[i]);
          }
        }
      }
      this.setState({ mentions: Array.from(mentions) });
      return;
    }
    this.setState({ mentions: [] });
  }
  static moveCaret(content, caretPos) {
    return `${content.slice(0, caretPos)}<span id="cursor">|</span>${content.slice(caretPos)}`;
  }
  toggleEmojiPicker() {
    const emojiTrigger = this.node;
    const triggerStyles = getComputedStyle(emojiTrigger);
    const bottom = `${parseInt(triggerStyles.bottom, 10) + emojiTrigger.clientHeight + 10}px`;
    this.setState({
      pickerActive: !this.state.pickerActive,
      pickerStyle: {
        bottom,
        right: '0px',
      },
    });
  }
  addEmoji(emoji) {
    const content = this.state.content + emoji;
    this.onChange(content);
  }
  render() {
    const { pickerActive } = this.state;
    return (
      <div
        className={`content_editable ${this.props.className}`}
        id={this.props.id}
        ref={(node) => { this.node = node; }}
      >
        <textarea
          className="textarea"
          onChange={(e) => { this.onChange(e.target.value); }}
          value={this.state.content}
          ref={(node) => { this.textarea = node; }}
        />
        <div
          className="previewNode"
          ref={(node) => { this.previewNode = node; }}
          dangerouslySetInnerHTML={{ __html: this.state.previewContent }}
        />
        <div id="mentions">
          {this.state.mentions.map(mention => (
            <div className="mention" key={mention}><p>{mention}</p></div>
          ))}
        </div>
        <TwemojiComp
          className="emoji_trigger"
          onClick={() => this.toggleEmojiPicker()}
        >
          <span role="img" aria-label="smile">🙂</span>
        </TwemojiComp>
        { pickerActive ? <EmojiPicker
          style={this.state.pickerStyle}
          onPick={emoji => this.addEmoji(emoji)}
        /> : null }
      </div>
    );
  }
}


ContentEditable.propTypes = {
  className: PropTypes.string, // eslint-disable-line
  id: PropTypes.string, // eslint-disable-line
  users: PropTypes.array //eslint-disable-line
};

export default ContentEditable;

          // <span>{this.state.previewContent}</span><span className="cursor" />
