import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TwemojiComp from 'react-twemoji';
import Twemoji from 'twemoji';
import rantscript from '../../consts/rantscript';
import EmojiPicker from '../emoji_picker/emoji_picker';

const HELPER_TYPES = {
  EMOJI: 'EMOJI',
};

class PostRant extends Component {
  constructor() {
    super();
    this.state = {
      rant_content: '',
      tags: '',
      posting: false,
      limitCrossed: false,
      activeHelper: null,
    };
  }

  onPost() {
    const { auth } = this.props;
    this.setState({ posting: true });
    rantscript
    .postRant(this.state.rant_content, this.state.tags, auth.user.authToken)
    .then((res) => {
      if (!res.success) {
        this.setState({ limitCrossed: true });
      }
      this.setState({ posting: false, rant_content: '', tags: '' });
    })
    .catch(() => {
      this.setState({ posting: false });
    });
  }
  toggleEmoji() {
    if (this.state.activeHelper === HELPER_TYPES.EMOJI) {
      this.setState({ activeHelper: null });
      return;
    }
    this.setState({ activeHelper: HELPER_TYPES.EMOJI });
  }
  static addEmoji(emoji) {
    const div = document.getElementById('post_rant_content');

    let range;
    const sel = window.getSelection();
    if (sel.anchorNode && sel.anchorNode.parentElement.id === 'post_rant_content') {
      if (sel.getRangeAt && sel.rangeCount) {
        range = sel.getRangeAt(0);
        range.deleteContents();
        const textNode = document.createTextNode(` ${emoji}\u00A0`);
        range.insertNode(textNode);
      }
    } else {
      div.innerHTML += (`${emoji}&nbsp;`);
    }

    Twemoji.parse(div);
  }
  render() {
    return (
      <div
        className="modal"
      >
        <div className="post_rant_container">
          <div className="post_rant">
            <div className="text_wrapper">
              <div
                className="text"
                id="post_rant_content"
                contentEditable="true"
              />
              <TwemojiComp
                className="emoji_trigger"
                onClick={() => this.toggleEmoji()}
              >
                <span role="img" aria-label="smile">🙂</span>
              </TwemojiComp>
            </div>
            {
              this.state.activeHelper === HELPER_TYPES.EMOJI ?
                <EmojiPicker onPick={emoji => PostRant.addEmoji(emoji)} /> : null
            }
            <textarea
              onChange={e => this.setState({ tags: e.target.value })}
              value={this.state.tags}
              placeholder="Tags"
              className="tags"
            />
            <div className="post">
              <button
                onClick={() => this.onPost()}
                disabled={this.state.posting}
              >Post Rant</button>
            </div>
            { this.state.limitCrossed ? <p>Right now you can only add 1 rant every 2 hours
               (every 1 hour for devRant++ members) because we want
                to make sure everyones content gets good exposure! Please contact
                 info@devrant.io if you have any questions :)</p> : null}
          </div>
        </div>
      </div>
    );
  }
}


PostRant.propTypes = {
  auth: PropTypes.object.isRequired,
};

export default PostRant;
