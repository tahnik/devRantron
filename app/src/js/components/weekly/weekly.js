import React, { Component } from 'react';
import Column from '../columns/column';

class Weekly extends Component {
  render() {
    return (
      <div className="weekly_container">
        <Column {...this.props} />
      </div>
    );
  }
}

export default Weekly;
