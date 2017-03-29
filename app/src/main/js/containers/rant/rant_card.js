import React, { Component } from 'react';

class RantCard extends Component {
  render() {
    return (
      <div className="rant_card col s12 m6 l6" >
        <div className="card blue-grey darken-1">
          <div className="card-content white-text">
            <p>{this.props.rant.text}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default RantCard;
