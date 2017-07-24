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
        right: '5px',
      },
    };
  }
  shouldComponentUpdate() {
    return true;
  }
  onChange() {
    console.log(this.node);
  }
  toggleEmojiPicker() {
    const emojiTrigger = this.node.getElementsByClassName('emoji_trigger')[0];
    const triggerStyles = getComputedStyle(emojiTrigger);
    const right = `${parseInt(triggerStyles.right, 10) + emojiTrigger.clientWidth}px`;
    const bottom = `${parseInt(triggerStyles.bottom, 10) + emojiTrigger.clientHeight}px`;
    this.setState({
      pickerActive: !this.state.pickerActive,
      pickerStyle: {
        bottom,
        right,
      },
    });
  }
  render() {
    const { pickerActive } = this.state;
    return (
      <div
        contentEditable
        className={`content_editable ${this.props.className}`}
        id={this.props.id}
        ref={(node) => { this.node = node; }}
        onInput={() => this.onChange()}
        suppressContentEditableWarning
      >
        <TwemojiComp
          className="emoji_trigger"
          onClick={() => this.toggleEmojiPicker()}
        >
          <span role="img" aria-label="smile">🙂</span>
        </TwemojiComp>
        { pickerActive ? <EmojiPicker style={this.state.pickerStyle} /> : null }
      </div>
    );
  }
}


ContentEditable.propTypes = {
  className: PropTypes.string, // eslint-disable-line
  id: PropTypes.string, // eslint-disable-line
};

export default ContentEditable;
