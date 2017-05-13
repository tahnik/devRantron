import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SideNav extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { theme, auth } = this.props;
    return (
      <div>
        SideNav
      </div>
    );
  }
}

SideNav.propTypes = {
};

export default SideNav;
