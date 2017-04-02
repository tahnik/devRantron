import React, { Component } from 'react';

class RantCard extends Component {
  render() {
    if (this.props.rant.attached_image !== '') {
      return (
        <div className="rant_card row" >
          <div className="card blue-grey darken-1">
            <div className="card-content white-text">
              <p>{this.props.rant.text}</p>
            </div>
            <div className="card-image" style={{ background: `url(${this.props.rant.attached_image.url}) no-repeat center center` }}>
              <div><i className="ion-arrow-expand" /></div>
            </div>
            <div className="card-bottomBar">
              <i className="ion-plus-round" />
              <p>{this.props.rant.score}</p>
              <i className="ion-minus-round" />
              <div style={{ flex: 1 }} />
              <p>{this.props.rant.num_comments}</p>
              <i className="ion-chatbubbles" />
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="rant_card row" >
        <div className="card blue-grey darken-1">
          <div className="card-content white-text">
            <p>{this.props.rant.text}</p>
          </div>
          <div className="card-bottomBar">
            <i className="ion-plus-round" />
            <p>{this.props.rant.score}</p>
            <i className="ion-minus-round" />
            <div style={{ flex: 1 }} />
            <p>{this.props.rant.num_comments}</p>
            <i className="ion-chatbubbles" />
          </div>
        </div>
      </div>
    );
  }
}

export default RantCard;
