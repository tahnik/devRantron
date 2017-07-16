import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Theme extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Hel: '',
    };
  }
  render() {
    return <div className="theme_container">Coming soon!</div>;
  }
}

Theme.propTypes = {
};

export default Theme;
