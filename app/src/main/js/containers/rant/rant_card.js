import React, { Component } from 'react';
/* API Ref:
attached_image: ""
created_time: 1491178991
edited: false
id: 509276
num_comments: 3
num_downvotes: 0
num_upvotes: 40
score: 40
tags: Array[]
text: ""
user_avatar: Object
user_id: 49546
user_score: 3506
user_username: "DLMousey"
vote_state: 0
*/
class RantCard extends Component {
  render() {
    return (
      <div className="rant_card row" >
        <div className="card blue-grey darken-1">
          <div className="card-user">
            <img src={`https://avatars.devrant.io/${this.props.rant.user_avatar.i}`}/>
            <div>
              <p>{this.props.rant.user_username}</p>
              <p className="user_score">+{this.props.rant.user_score}</p>
            </div>
          </div>
          <div className="card-content white-text">
            <pre><p>{this.props.rant.text}</p></pre>
          </div>
          <div className="card-image">
            <img src={this.props.rant.attached_image.url} alt="" />
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
