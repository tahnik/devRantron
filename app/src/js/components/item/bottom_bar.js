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
      triggerActive: false,
      favorited: false,
      subscribed: false,
      plusHover: false,
      minusHover: false,
    };
  }
  componentWillMount() {
    const { isUser, item } = this.props;
    let nextIsUpvoted = item.vote_state;
    let favorited = false;
    if (item.favorited) {
      favorited = true;
    }
    if (isUser) {
      nextIsUpvoted = 0;
    }
    this.setState({
      isVoted: nextIsUpvoted,
      score: item.score,
      favorited,
    });
  }
  onFavorite() {
    const favorited = !this.state.favorited;
    this.setState({ favorited });
    this.props.onFavorite(favorited);
  }
  onSubscribe() {
    const subscribed = !this.state.subscribed;
    this.setState({ subscribed });
    this.props.onSubscribe(subscribed);
  }
  vote(state) {
    if (this.props.isUser) {
      return;
    }
    const { isVoted } = this.state;
    const { item } = this.props;
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
    const { vote, type } = this.props;
    if (type) {
      vote(nextIsVoted, item.id, type);
    } else {
      vote(nextIsVoted, item.id);
    }
    this.setState({ isVoted: nextIsVoted, score: nextScore });
  }
  getAddMention() {
    const { addMention, username } = this.props;
    if (typeof addMention !== 'undefined') {
      return (
        <div
          className="addMention"
          onClick={() => addMention(`@${username}`)}
        >
          <p><i className="ion-reply" /></p>
        </div>
      );
    }
    return <div />;
  }
  togglePlusHover() {
    this.setState({ plusHover: !this.state.plusHover });
  }
  toggleMinusHover() {
    this.setState({ minusHover: !this.state.minusHover });
  }
  render() {
    const {
      type, item, onDelete, theme,
    } = this.props;
    const { favorited, subscribed } = this.state;
    const disabled = this.props.isUser ? 'disabled' : '';
    const backgroundColor = type === ITEM.COMMENT.NAME ?
      theme.comment_card.backgroundColor : theme.item_card.backgroundColor;
    const color = type === ITEM.COMMENT.NAME ?
      theme.comment_card.color : theme.item_card.color;
    const voteColor = theme.plus_notif.backgroundColor;
    return (
      <div
        className="bottom_bar_container"
        style={{ backgroundColor, color }}
      >
        <div className="left_items">
          <div
            className={`upvote ${disabled} ${this.state.isVoted > 0 ? 'upvoted' : ''}`}
            disabled={disabled}
            style={{ backgroundColor: this.state.plusHover ? theme.backgroundColor : '' }}
            onMouseEnter={this.togglePlusHover.bind(this)}
            onMouseLeave={this.togglePlusHover.bind(this)}
            onClick={() => this.vote(1)}
          >
            <div
              style={{ backgroundColor: voteColor }}
              className={`before ${this.state.isVoted > 0 ? 'votebefore' : ''}`}
            />
            <span className="ud_icon">+</span>
            <span className="ud_icon">+</span>
            <div
              style={{ borderColor: this.state.isVoted > 0 ? `${voteColor}` : 'rgba(0,0,0,0)' }}
              className={`${this.state.isVoted > 0 ? 'voteafter' : ''} after`}
            />
          </div>
          <div className="score" >
            <span>{ this.state.score }</span>
          </div>
          <div
            onClick={() => this.vote(-1)}
            disabled={disabled}
            className={`downvote ${disabled} ${this.state.isVoted < 0 ? 'downvoted' : ''}`}
            style={{ backgroundColor: this.state.minusHover ? theme.backgroundColor : '' }}
            onMouseEnter={this.toggleMinusHover.bind(this)}
            onMouseLeave={this.toggleMinusHover.bind(this)}
          >
            <div
              style={{ backgroundColor: voteColor }}
              className={`before ${this.state.isVoted < 0 ? 'votebefore' : ''}`}
            />
            <span className="ud_icon">-</span>
            <span className="ud_icon">-</span>
            <div
              style={{ borderColor: this.state.isVoted < 0 ? `${voteColor}` : 'rgba(0,0,0,0)' }}
              className={`${this.state.isVoted < 0 ? 'voteafter' : ''} after`}
            />
          </div>
        </div>
        <div
          className="right_items"
          onMouseLeave={() => this.setState({ triggerActive: false })}
        >
          <div className="togglable">
            <div
              className={`trigger ${this.state.triggerActive ? 'active' : ''}`}
              onClick={() => this.setState({ triggerActive: true })}
              onMouseEnter={() => this.setState({ triggerActive: true })}
            >
              <p><i className="ion-android-more-horizontal" /></p>
            </div>
            <div
              className={`toggle_items ${this.state.triggerActive ? 'active' : ''}`}
              onMouseLeave={() => this.setState({ triggerActive: false })}
            >
              { this.props.isUser ?
                <div
                  className="toggle_item delete"
                  onClick={() => onDelete()}
                >
                  <p><i className="ion-android-delete" /></p>
                </div>
                : null
              }
              {/* {
                !this.props.isUser ?
                  <div
                    className={`toggle_item subscribe ${subscribed ? 'active' : null}`}
                    onClick={() => this.onSubscribe()}
                  >
                    <p><i className="ion-social-rss-outline" /></p>
                  </div>
                  : null
              } */}
              { !item.rant_id && !item.c_type ?
                <div
                  className={`toggle_item favorite ${favorited ? 'active' : null}`}
                  onClick={() => this.onFavorite()}
                >
                  <p><i className="ion-android-favorite-outline" /></p>
                </div>
                : null
              }
              { !item.rant_id ?
                <div
                  className="toggle_item link"
                  onClick={() => this.props.copyToClip()}
                >
                  <p><i className="ion-link" /></p>
                </div>
                : null
              }
              { this.props.isUser && this.props.editable ?
                <div
                  className="toggle_item edit"
                  onClick={() => this.props.onEdit()}
                >
                  <p><i className="ion-android-create" /></p>
                </div>
                : null
              }
            </div>
          </div>
          {
            type === ITEM.COMMENT.NAME ?
              null :
              <div className="comments" onClick={() => this.props.onCommentsClick()} >
                <p><i className="ion-ios-chatboxes-outline" /></p>
                <span>{ item.num_comments }</span>
              </div>
          }
          {
            this.getAddMention()
          }
        </div>
      </div>
    );
  }
}


BottomBar.propTypes = {
  isUser: PropTypes.bool.isRequired,
  editable: PropTypes.bool.isRequired,
  vote: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  type: PropTypes.string,
  addMention: PropTypes.func,
  username: PropTypes.string.isRequired,
  onCommentsClick: PropTypes.func,
  copyToClip: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  onFavorite: PropTypes.func.isRequired,
  onSubscribe: PropTypes.func.isRequired,
};

export default BottomBar;
