import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TwemojiComp from 'react-twemoji';
import Twemoji from 'twemoji';
import EmojiPicker from '../emoji_picker/emoji_picker';

function replaceAll(string, search, replacement) {
  return string.replace(new RegExp(search, 'g'), replacement);
}

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
    };
  }
  shouldComponentUpdate() {
    return true;
  }
  onChange(value, caretOffset = 0) {
    this.setState({ content: value });
    let content = value;
    let caretPos = 0;
    if (this.textarea) {
      caretPos = this.textarea.selectionStart;
    }
    content = ContentEditable.moveCaret(content, caretPos + caretOffset);
    content = content.replace(/(?:\r\n|\r|\n)/g, '<br />');
    content = content.replace(/(?:\r\n|\r|\n)/g, '<br />');
    this.setState({ previewContent: content });
  }
  static moveCaret(content, caretPos) {
    return `${content.slice(0, caretPos)}<span id="cursor">|</span>${content.slice(caretPos)}`;
  }
  getContent() {
    let content = this.state.content;
    let caretPos = 0;
    if (this.textarea) {
      caretPos = this.textarea.selectionStart;
    }
    content = ContentEditable.moveCaret(content, caretPos);
    content = content.replace(/(?:\r\n|\r|\n)/g, '<br />');
    return Twemoji.parse(content);
  }
  ontextareaClick() {
    let content = this.state.content;
    let caretPos = 0;
    if (this.textarea) {
      caretPos = this.textarea.selectionStart;
    }
    content = ContentEditable.moveCaret(content, caretPos);
    this.setState({ previewContent: content });
  }
  keyDown(e) {
    let caretPos = 0;
    if (this.textarea) {
      caretPos = this.textarea.selectionStart;
    }

    const preText = this.textarea.value.substring(0, caretPos).split(' ').pop();
    if (preText.indexOf(':') > -1) {
      const word = preText.split(':').pop();
      console.log(word); // this is the emoji
    }

    if (e.keyCode === 37 || e.keyCode === 39) {
      this.ontextareaClick();
    }
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
    this.onChange(content, emoji.length);
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
          onClick={e => this.ontextareaClick(e)}
          onKeyUp={e => this.keyDown(e)}
        />
        <div
          className="previewNode"
          ref={(node) => { this.previewNode = node; }}
          dangerouslySetInnerHTML={{ __html: Twemoji.parse(this.state.previewContent) }}
        />
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
};

export default ContentEditable;
