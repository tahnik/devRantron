import React, { Component } from 'react';

import UserBadge from '../user/user_badge';

const { dialog, app } = require('electron').remote;
const fs = require('electron').remote.require('fs');

// Replace With Redux
const user = JSON.parse('{"username":"Dacexi","score":5170,"about":"I pretend to know programming. Currently working on github.com/tahnik/devRantron","location":"Sweden","created_time":1472646487,"skills":"C#, C, PHP, Python, HTML, JS, React Native, Vue","github":"rekkyrek","website":"droppl.me","content":[],"avatar":{"b":"d55161","i":"v-11_c-1_b-5_g-m_9-1_1-1_16-14_3-2_8-3_7-3_5-4_12-1_6-3_10-9_2-54_11-2_4-4_19-2_21-2.png"}}');

class RantComposer extends Component {
  constructor(props) {
    super(props);
    this.state = { rantText: '', rantImage: '' };
  }
  selectImage() {
    dialog.showOpenDialog({
      title: 'Select Image',
      defaultPath: app.getPath('pictures'),
      filters: [
        { name: 'Images', extensions: ['jpg', 'png', 'gif'] },
      ],
    }, (fp) => {
      if (fp.length !== 0) {
        let data;
        switch (fp[0].split('.')[fp[0].split('.').length - 1]) {
          case 'png':
            data = `data:image/png;base64,${new Buffer(fs.readFileSync(fp[0])).toString('base64')}`;
            break;
          case 'gif':
            data = `data:image/gif;base64,${new Buffer(fs.readFileSync(fp[0])).toString('base64')}`;
            break;
          default:
            data = `data:image/jpeg;base64,${new Buffer(fs.readFileSync(fp[0])).toString('base64')}`;
        }
        this.setState({ rantImage: data });
      }
    });
  }
  render() {
    return (
      <div className="rant_composer">
        <textarea
          rows="8"
          placeholder="Lol windows sux amirite?"
          id="rantEditorText"
          onInput={(e) => {
            this.setState({ rantText: e.target.value });
          }}
        />
        <input type="text" placeholder="Tags (Linux ftw, Windows Sux, etc.)" />
        <button
          className="btn"
          onClick={() => this.selectImage()}
        >Add Image</button>
        <button
          className="btn"
          onClick={() => {
            console.log('hook dis shit up to redux');
          }}
        >Post Rant</button>
      </div>
    );
  }
}

export default RantComposer;
