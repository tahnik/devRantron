import React, { Component } from 'react';
import PropTypes from 'prop-types';

const { ipcRenderer, shell } = require('electron');

const showdown = require('showdown');

class ReleaseInfo extends Component {
  constructor() {
    super();
    this.state = {
      markdown: null,
    };
  }
  componentWillMount() {
    fetch('https://raw.githubusercontent.com/tahnik/devRantron/update-md/UPDATE.md')
      .then((res) => {
        res.text().then((latestRelease) => {
          console.log(latestRelease);
          const converter = new showdown.Converter();
          const html = converter.makeHtml(latestRelease);
          this.setState({ markdown: html });
        });
      });
  }
  static handleUpdate() {
    let plat = '';

    if (/^win/.test(process.platform)) { plat = 'windows'; }
    if (/^dar/.test(process.platform)) { plat = 'osx'; }
    if (/^lin/.test(process.platform)) { plat = 'linux'; }

    if (plat === 'windows') {
      ipcRenderer.send('updateNow', true);
    } else {
      shell.openExternal('https://devrantron.firebaseapp.com/');
    }
  }
  render() {
    const { close } = this.props;
    return (
      <div className="modal">
        <div className="release_info_container">
          <div className="release_info">
            {
              this.state.markdown === '' ?
                <div>Fetching release note</div> :
                <div dangerouslySetInnerHTML={{ __html: this.state.markdown }} />
            }
            <div className="controls" >
              <button onClick={() => ReleaseInfo.handleUpdate()}>Update</button>
              <button onClick={() => close()}>Not Now</button>
            </div>
            <div className="info" >
              <span>* On Windows: Update will be installed after you click update</span>
              <span>* On MacOS and Linux: Clicking update will take you to our website.
                You have to download the latest update from there.</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ReleaseInfo.propTypes = {
  close: PropTypes.func.isRequired,
};

export default ReleaseInfo;
