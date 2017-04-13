import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRant } from '../../actions/rant';
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
  openRant(id) {
    this.props.fetchRant(id);
  }
  render() {
    const { rant } = this.props;
    let trimmedString = rant.text;
    if (rant.text.length > 300) {
      const maxLength = 300;
      trimmedString = rant.text.substr(0, maxLength);
      trimmedString = `${trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(' ')))}...(Read More)`;
    }

    let imageSource = <img src="res/images/empty_avatar.png" alt="" />;

    if (rant.user_avatar.i) {
      imageSource = <img src={`https://avatars.devrant.io/${rant.user_avatar.i}`} alt="" />;
    }
    return (
      <div className="rant_card row" >
        <div className="card blue-grey darken-1">
          <div className="card-user">
            { imageSource }
            <div>
              <p>{rant.user_username}</p>
              <p className="user_score">+{rant.user_score}</p>
            </div>
          </div>
          <div className="card-content white-text">
            <pre><p>{trimmedString}</p></pre>
          </div>
          <div className="card-image">
            <img src={rant.attached_image.url} alt="" />
          </div>
          <div className="card-bottomBar">
            <i className="ion-plus-round" />
            <p>{rant.score}</p>
            <i className="ion-minus-round" />
            <div style={{ flex: 1 }} />
            <p>{rant.num_comments}</p>
            <button onClick={() => this.openRant(rant.id)} >
              <i className="ion-chatbubbles" />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

RantCard.propTypes = {
  rant: React.PropTypes.shape({
    text: React.PropTypes.string,
  }).isRequired,
  fetchRant: React.PropTypes.func.isRequired,
};

export default connect(null, { fetchRant })(RantCard);
