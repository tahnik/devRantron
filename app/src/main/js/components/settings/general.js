import React, { Component } from 'react';
import PropTypes from 'prop-types';

class General extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Hel: '',
    };
  }
  render() {
    return <div>General!</div>;
  }
}

General.propTypes = {
};

export default General;
