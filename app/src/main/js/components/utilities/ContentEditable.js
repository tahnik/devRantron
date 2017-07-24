import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TwemojiComp from 'react-twemoji';
import Twemoji from 'twemoji';
import EmojiPicker from '../emoji_picker/emoji_picker';

class ContentEditable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pickerActive: false,
      pickerStyle: {
        bottom: '5px',
        right: '0px',
      },
    };
  }
  shouldComponentUpdate() {
    return true;
  }
  onChange() {
  }
  toggleEmojiPicker() {
    this.contentEditable.blur();
    // const emojiTrigger = this.node.getElementsByClassName('emoji_trigger')[0];
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
    let range;
    const sel = window.getSelection();
    if (sel.anchorNode && sel.anchorNode.parentElement.id === 'ce_textarea') {
      if (sel.getRangeAt && sel.rangeCount) {
        range = sel.getRangeAt(0);
        range.deleteContents();
        const textNode = document.createTextNode(`${emoji}`);
        range.insertNode(textNode);
      }
    } else {
      this.contentEditable.innerHTML += (`${emoji}&nbsp;`);
      range = document.createRange();
      range.selectNodeContents(this.contentEditable);
      range.collapse(false);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    }

    Twemoji.parse(this.contentEditable);
  }
  render() {
    const { pickerActive } = this.state;
    return (
      <div
        className={`content_editable ${this.props.className}`}
        id={this.props.id}
        ref={(node) => { this.node = node; }}
      >
        <div
          contentEditable
          className="textarea"
          id="ce_textarea"
          ref={(node) => { this.contentEditable = node; }}
          onInput={() => this.onChange()}
          suppressContentEditableWarning
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
