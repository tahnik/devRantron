/**
 * Reusable bottom bar for all the item cards.
 * Controls upvotes and downvotes
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ITEM } from '../../consts/types';

class BottomBar extends Component {
  constructor() {
    super();
    this.state = {
      isVoted: 0,
      score: 0,
    };
  }
  componentWillMount() {
    const { score, isVoted, isUser } = this.props;
    let nextIsUpvoted = isVoted;
    if (isUser) {
      nextIsUpvoted = 0;
    }
    this.setState({ isVoted: nextIsUpvoted, score, staticScore: score });
  }
  vote(state) {
    if (this.props.isUser) {
      return;
    }
    const { isVoted } = this.state;
    let nextScore = this.state.score;
    let nextIsVoted = 0;
    if (isVoted === state) {
      nextScore -= isVoted;
    } else if (isVoted !== 0) {
      nextScore -= (2 * isVoted);
      nextIsVoted = state;
    } else {
      nextScore += state;
      nextIsVoted = state;
    }
    const { vote, id, type } = this.props;
    if (type) {
      vote(nextIsVoted, id, type);
    } else {
      vote(nextIsVoted, id);
    }
    this.setState({ isVoted: nextIsVoted, score: nextScore });
  }
  render() {
    const { comments, type } = this.props;
    const disabled = this.props.isUser ? 'disabled' : '';
    return (
      <div className="bottom_bar_container" >
        <div
          className={`upvote ${disabled} ${this.state.isVoted > 0 ? 'upvoted' : ''}`}
          disabled={disabled}
          onClick={() => this.vote(1)}
        >
          <span className="ud_icon">+</span>
          <span className="ud_icon">+</span>
        </div>
        <div className="score" >
          <span>{ this.state.score }</span>
        </div>
        <div
          onClick={() => this.vote(-1)}
          disabled={disabled}
          className={`downvote ${disabled} ${this.state.isVoted < 0 ? 'downvoted' : ''}`}
        >
          <span className="ud_icon">-</span>
          <span className="ud_icon">-</span>
        </div>
        <div className="padding" />
        {
          type === ITEM.COMMENT.NAME ? null :
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
  isUser: PropTypes.bool.isRequired,
  vote: PropTypes.func.isRequired,
  comments: PropTypes.number,
  isVoted: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  type: PropTypes.string,
};

export default BottomBar;
