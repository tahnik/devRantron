import React, { Component } from 'react';
import TopNav from '../containers/top_nav';

/* Ignore esling error for now. More stuff will be added later */
class Header extends Component {
  render() {
    return (
      <div className="header">
        <TopNav />
      </div>
    );
  }
}

export default Header;
