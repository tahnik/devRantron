import React, { Component } from 'react';
import PropTypes from 'prop-types';

const { ipcRenderer } = require('electron');

class CompactButton extends Component {
  constructor() {
    super();
    this.state = {
      active: false,
    };
  }
  handleCompact() {
    ipcRenderer.send('toggleCompact');
    this.setState({ active: !this.state.active });
  }
  render() {
    const { theme } = this.props;
    return (
      <button
        className="compact"
        onClick={() => this.handleCompact()}
        style={{
          backgroundColor: theme.item_card.backgroundColor,
        }}
      >
        {
          this.state.active ?
            <i className="ion-arrow-expand" /> :
            <i className="ion-arrow-shrink" />
        }
      </button>
    );
  }
}

CompactButton.propTypes = {
  theme: PropTypes.object.isRequired,
};

export default CompactButton;
