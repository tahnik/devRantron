import React, { Component } from 'react';

class RantCard extends Component {
  render() {
    let image = null;
    if(this.props.rant.attached_image != "") {
      image = this.props.rant.attached_image.url
    }
    return (
      <div className="rant_card row" >
        <div className="card blue-grey darken-1">
          <div className="card-content white-text">
            <p>{this.props.rant.text}</p>
          </div>
          <div className="card-image">
            <img src={image} alt="" />
          </div>
        </div>
      </div>
    );
  }
}

export default RantCard;
