import React, { Component } from 'react';

class ColumnTopBar extends Component {
  render() {
    return (
      <div className="column_topbar">
        <span className="active">Algo</span>
        <span>Top</span>
        <span>Recent</span>
      </div>
    );
  }
}

export default ColumnTopBar;
