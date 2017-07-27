import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TwemojiComp from 'react-twemoji';
import Twemoji from 'twemoji';
import EmojiPicker from '../emoji_picker/emoji_picker';

let active = false;
let pos = 0;

let component = null;

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
      selectedMention: 0,
    };
  }
  shouldComponentUpdate() {
    return true;
  }
  componentDidMount() {
    component = this;
    document.addEventListener('keydown', ContentEditable.handleArrowKeys, false);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', ContentEditable.handleArrowKeys, false);
  }
  static handleArrowKeys(e) {
    const { mentions, selectedMention } = component.state;
    const lastIndex = mentions.length - 1;
    switch (e.keyCode) {
      case 9:
        if (active) {
          e.preventDefault();
          if (selectedMention === lastIndex) {
            component.setState({ selectedMention: 0 });
            return;
          }
          component.setState({ selectedMention: selectedMention + 1 });
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
  addMention() {
    const { mentions, selectedMention } = this.state;
    const caretPos = this.textarea.selectionStart;
    let content = this.state.content;
    content = `${content.slice(0, pos)}${mentions[selectedMention]} ${content.slice(caretPos, content.length)}`;
    this.onChange(content);
    active = false;
    pos = 0;
    this.setState({ selectedMention: 0 });
  }
  onChange(value) {
    this.setState({ content: value });
    let content = value;
    let caretPos = 0;
    if (this.textarea) {
      caretPos = this.textarea.selectionStart;
    }
    this.buildMentions(value, caretPos);
    this.previewNode.scrollTop = this.textarea.scrollTop;
    content = content.substr(0, caretPos);
    content = ContentEditable.moveCaret(content, caretPos);
    this.setState({ previewContent: content });
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
    const mentions = new Set();
    if (active) {
      const searchText = text.substring(pos, caretPos);
      const searchTextArray = Array.from(searchText); // Thanks ES6
      if (searchTextArray.length === 0) {
        for (let k = 0; k < users.length; k += 1) {
          if (mentions.size > 9) {
            break;
          }
          mentions.add(users[k]);
        }
      } else {
        for (let i = 0; i < users.length; i += 1) {
          if (mentions.size > 9) {
            break;
          }
          let candidate = true;
          for (let j = 0; j < searchTextArray.length; j += 1) {
            if (users[i].toLowerCase().indexOf(searchTextArray[j].toLowerCase()) === -1) {
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
    const { pickerActive, selectedMention } = this.state;
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
          {this.state.mentions.map((mention, index) => (
            <div
              className={`mention ${index === selectedMention ? 'active' : ''}`}
              key={mention}
            ><p>{mention}</p></div>
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
