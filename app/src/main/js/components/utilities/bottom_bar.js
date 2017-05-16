import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BottomBar extends Component {
  constructor() {
    super();
    this.state = {
      isUpvoted: 0,
      score: 0,
    };
  }
  componentWillMount() {
    const { score, isUpvoted } = this.props;
    this.setState({ isUpvoted, score });
  }
  vote(voteState) {
    const { vote, rantID, type } = this.props;
    if (type) {
      vote(voteState, rantID, type);
    } else {
      vote(voteState, rantID);
    }
    this.setState({ isUpvoted: voteState, score: this.state.score += 1 });
  }
  render() {
    const { comments } = this.props;
    return (
      <div className="bottom_bar_container" >
        <div
          className="upvote"
          onClick={() => this.vote(1)}
          style={{
            backgroundColor: this.state.isUpvoted > 0 ? '#D55161' : null,
          }}
        >
          <i className="ion-ios-arrow-thin-up" />
        </div>
        <div className="score" >
          <span>{ this.state.score }</span>
        </div>
        <div
          onClick={() => this.vote(-1)}
          className="downvote"
          style={{
            backgroundColor: this.state.isUpvoted < 0 ? '#D55161' : null,
          }}
        >
          <i className="ion-ios-arrow-thin-down" />
        </div>
        <div className="padding" />
        {
          !comments ? null :
          <div className="comments" >
            <i className="ion-chatbubbles" />
            <span>{ comments }</span>
          </div>
        }
      </div>
    );
  }
}


BottomBar.propTypes = {
  score: PropTypes.number.isRequired,
  vote: PropTypes.func.isRequired,
  comments: PropTypes.number, //eslint-disable-line
  isUpvoted: PropTypes.number.isRequired,
  rantID: PropTypes.number.isRequired,
  type: PropTypes.string, //eslint-disable-line
};

export default BottomBar;
