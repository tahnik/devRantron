import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Notifs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      middleWidth: null,
    };
  }
  componentDidMount() {
    window.addEventListener('resize', () => {
      const middleContainer = document.getElementById('middle_container');
      if (middleContainer) {
        this.setState({ middleWidth: middleContainer.offsetWidth });
      }
    }, false);
  }
  render() {
    return (
      <div className="notifs_container" >
        Notifs
      </div>
    );
  }
}

Notifs.propTypes = {
};

export default Notifs;
