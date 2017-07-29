import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TwemojiComp from 'react-twemoji';
import Twemoji from 'twemoji';
import rantscript from '../../consts/rantscript';
import EmojiPicker from '../emoji_picker/emoji_picker';

const electron = require('electron');

const HELPER_TYPES = {
  EMOJI: 'EMOJI',
};

function replaceAll(str, search, replacement) {
  const target = str;
  return target.replace(new RegExp(search, 'g'), replacement);
}

class PostRant extends Component {
  constructor() {
    super();
    this.state = {
      rant_content: '',
      tags: '',
      posting: false,
      limitCrossed: null,
      activeHelper: null,
      image: null,
    };
  }

  static parseHtml(string) {
    let str = string;
    const parser = new DOMParser();
    str = replaceAll(str, '<br>', '\n\r');
    const imgtags = str.match(/<(img+)\s+\w+.*?>/g);
    let parsedStr = '';
    if (imgtags === null) {
      return parser.parseFromString(`<!doctype html><body> ${str}`, 'text/html').body.textContent;
    }
    for (let i = 0; i < imgtags.length; i += 1) {
      parsedStr = str.replace(imgtags[i], imgtags[i].match(/alt="(.*?)"/)[1]);
    }
    return parser.parseFromString(`<!doctype html><body> ${parsedStr}`, 'text/html').body.textContent;
  }

  onPost() {
    const { auth } = this.props;
    this.setState({ posting: true });
    const rantText = PostRant.parseHtml(document.getElementById('post_rant_content').innerHTML);
    rantscript
      .postRant(rantText, this.state.tags, auth.user.authToken, this.state.image)
      .then((res) => {
        if (!res.success) {
          this.setState({ limitCrossed: res.error });
          return;
        }
        this.setState({
          posting: false,
          rant_content: '',
          tags: '',
          limitCrossed: null,
        });
        this.props.close();
      })
      .catch(() => {
        this.setState({ posting: false });
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
                onClick={() => this.selectImage()}
              >
                {this.state.image === null && 'Add Image'}
                {this.state.image !== null && 'Remove Image'}
              </button>
              <button
                onClick={() => this.onPost()}
                disabled={this.state.posting}
              >Post Rant</button>
            </div>
            <p>{this.state.limitCrossed || ''}</p>
          </div>
        </div>
      </div>
    );
  }
}


PostRant.propTypes = {
  auth: PropTypes.object.isRequired,
  close: PropTypes.func.isRequired,
};

export default PostRant;
