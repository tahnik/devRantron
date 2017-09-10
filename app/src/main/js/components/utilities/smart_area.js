import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TwemojiComp from 'react-twemoji';
import Fuse from 'fuse.js';
import EmojiPicker from '../emoji_picker/emoji_picker';
import { escapeRegExp, getAllEmojis, getEmojisFromText } from '../../consts/utils';

const electron = require('electron');

/**
 * We use these two variable to track @mentions
 * Here ${active} determines if the @mention div is currently being shown
 * ${pos} is where the caret pos is
 */
let active = false;
let pos = null;

/**
 * ${component} is set to this class when the component mounts
 * We need this reference in scroll handlers. As we can't bind this to named scroll handlers.
 */
let component = null;

class SmartArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pickerActive: false,
      previewContent: '',
      pickerStyle: {
        bottom: '5px',
        right: '0px',
      },
      image: null,
      mentions: [],
      selectedMention: 0,
    };
  }
  componentDidMount() {
    component = this;
    document.addEventListener('keydown', SmartArea.handleArrowKeys, false);
    this.charLeft.style.top = `${parseInt(window.getComputedStyle(this.textarea).height, 10) - 5}px`;
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
  componentWillUnmount() {
    document.removeEventListener('keydown', SmartArea.handleArrowKeys, false);
  }
  static handleArrowKeys(e) {
    const { mentions, selectedMention } = component.state;
    const lastIndex = mentions.length - 1;
    switch (e.keyCode) {
      case 9:
        if (active) {
          e.preventDefault();
          component.addMention();
        }
        break;
      case 13: {
        if (active) {
          e.preventDefault();
          component.addMention();
        }
        break;
      }
      case 38: {
        if (active) {
          e.preventDefault();
          if (selectedMention === 0) {
            component.setState({ selectedMention: lastIndex });
            return;
          }
          component.setState({ selectedMention: selectedMention - 1 });
        }
        break;
      }
      case 39:
        if (active) {
          e.preventDefault();
          component.addMention();
        }
        break;
      case 40: {
        if (active) {
          e.preventDefault();
          if (selectedMention === lastIndex) {
            component.setState({ selectedMention: 0 });
            return;
          }
          component.setState({ selectedMention: selectedMention + 1 });
        }
        break;
      }
      default:
    }
  }
  addMention() {
    const { selectedMention, mentions } = this.state;
    const { users } = this.props;
    const index = mentions[selectedMention];
    if (typeof index !== 'undefined') {
      this.addStringToContent(users[index]);
    }
    active = false;
    pos = null;
    this.setState({ selectedMention: 0 });
  }
  addEmoji(emoji) {
    this.addStringToContent(emoji);
  }
  addStringToContent(string) {
    const caretPos = this.textarea.selectionStart;
    let content = this.props.value;
    content = `${content.slice(0, pos || caretPos)}${string} ${content.slice(caretPos, content.length)}`;
    this.onChange(content);
  }
  onChange(value) {
    this.props.onChange(value);
    let content = value;
    let caretPos = 0;
    if (this.textarea) {
      caretPos = this.textarea.selectionStart;
    }
    this.buildMentions(value, caretPos);
    this.previewNode.scrollTop = this.textarea.scrollTop;
    content = content.substr(0, caretPos);
    content = SmartArea.moveCaret(content, caretPos);
    this.setState({
      previewContent: content,
    });
  }
  buildMentions(text, caretPos) {
    const lastChar = text.charAt(caretPos - 1);
    const { users } = this.props;
    if (lastChar === ' ' || lastChar === '') {
      active = false;
      pos = 0;
    }
    if (lastChar === '@') {
      pos = caretPos;
      active = true;
    }
    let mentions = null;
    if (active) {
      const searchText = text.substring(pos, caretPos);
      if (searchText === '') {
        const arraySize = users.length > 10 ? 10 : users.length;
        this.setState({
          mentions: [...Array(arraySize).keys()],
          selectedMention: arraySize - 1,
        });
        return;
      }
      const options = {
        shouldSort: true,
        threshold: 0.0,
        location: 0,
      };
      const fuse = new Fuse(users, options);
      mentions = new Set(fuse.search(searchText));
      this.setState({ mentions: Array.from(mentions), selectedMention: mentions.size - 1 });
      return;
    }
    this.setState({ mentions: [] });
  }
  static moveCaret(content, caretPos) {
    return `${content.slice(0, caretPos)}<span id="cursor">|</span>${content.slice(caretPos)}`;
  }
  toggleEmojiPicker(bool) {
    const isPost = typeof this.props.tags !== 'undefined';
    const emojiTrigger = this.node;
    const triggerStyles = getComputedStyle(emojiTrigger);
    let bottom = `${parseInt(triggerStyles.bottom, 10) + emojiTrigger.clientHeight + 10}px`;
    let top = null;
    if (isPost) {
      bottom = null;
      top = '12px';
    }
    const isActive = typeof bool === 'undefined' ? !this.state.pickerActive : bool;
    this.setState({
      pickerActive: isActive,
      pickerStyle: {
        bottom,
        top,
        right: '0px',
      },
    });
  }
  selectImage() {
    if (this.state.image !== null) {
      this.setState({ image: null });
    } else {
      const { dialog } = electron.remote;
      dialog.showOpenDialog({
        title: 'Upload image',
        filters: [{ name: 'Images', extensions: ['jpg', 'png', 'gif'] }],
      }, (image) => {
        this.setState({ image: image[0] });
      });
    }
  }
  onPost() {
    let content = this.props.value;
    const extractedEmojis = new Set();
    getEmojisFromText(content, 0, extractedEmojis);
    const emojis = getAllEmojis();
    extractedEmojis.forEach((extractedEmoji) => {
      const colonRemoved = extractedEmoji.replace(/:/g, '');
      const emoji = emojis[colonRemoved];
      if (typeof emoji !== 'undefined') {
        const regex = new RegExp(escapeRegExp(extractedEmoji), 'g');
        content = content.replace(regex, emoji);
      }
    });

    this.props.onPost(content, this.state.image);
    this.toggleEmojiPicker(false);
    this.setState({ image: null });
  }
  render() {
    const { pickerActive, selectedMention } = this.state;
    const invalidContent = this.props.value.length < 5;
    const isPost = typeof this.props.tags !== 'undefined';
    return (
      <div
        className={`smart_area ${this.props.className}`}
        id={this.props.id}
        ref={(node) => { this.node = node; }}
      >
        <textarea
          className={`smart_textarea ${invalidContent ? 'invalid' : ''}`}
          onChange={(e) => { this.onChange(e.target.value); }}
          value={this.props.value}
          placeholder={this.props.placeholder}
          ref={(node) => { this.textarea = node; }}
        />
        <div
          className="previewNode"
          ref={(node) => { this.previewNode = node; }}
          dangerouslySetInnerHTML={{ __html: this.state.previewContent }}
        />
        <div id="mentions">
          {[...this.state.mentions].map((mention, index) => (
            <div
              className={`mention ${index === selectedMention ? 'active' : ''}`}
              key={mention}
            ><p>{this.props.users[mention]}</p></div>
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
        { typeof this.props.tags !== 'undefined' ? <textarea
          className="tags"
          placeholder="tags"
          onChange={e => this.props.onTagsChange(e.target.value)}
        /> : null }
        { this.props.maxChar ?
          <p
            className="charLeft"
            ref={(node) => { this.charLeft = node; }}
          >{this.props.maxChar - this.props.value.length}</p>
          : null
        }
        <div className="post">
          <button onClick={() => this.selectImage()}>
            {this.state.image === null && 'Add Image'}
            {this.state.image !== null && 'Remove Image'}
          </button>
          <button
            disabled={this.props.disabled || invalidContent}
            onClick={() => this.onPost()}
          >{`${isPost ? 'Post Rant' : 'Add Comment'}`}</button>
        </div>
      </div>
    );
  }
}


SmartArea.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  users: PropTypes.array,
  onPost: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  tags: PropTypes.string,
  onTagsChange: PropTypes.func,
  placeholder: PropTypes.string.isRequired,
  maxChar: PropTypes.number.isRequired,
};

export default SmartArea;
