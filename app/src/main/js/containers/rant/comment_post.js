import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  postComment,
  updateCommentPost,
} from '../../actions/comment_post';
import STATE from '../../consts/state';

/*
 * This has to be a component class.
 * So ignore eslint
 * Also, text of postCommentState should not be validated as it is changing
 * every milliseconds
 */
class CommentPost extends Component { // eslint-disable-line
  render() {
    let disabled = false;
    if (this.props.postCommentState.state === STATE.LOADING) {
      disabled = true;
    }
    return (
      <div className="comment_post_container" >
        <textarea
          value={this.props.postCommentState.text} // eslint-disable-line
          onChange={e => this.props.updateCommentPost(e.target.value)}
        />
        <button
          disabled={disabled}
          onClick={() => this.props.postComment(
            this.props.postCommentState.text, // eslint-disable-line
            this.props.rant.id,
            this.props.auth.id,
            this.props.auth.token,
            this.props.auth.user_id,
          )}
          className="btn"
        >Add Comment</button>
      </div>
    );
  }
}

CommentPost.propTypes = {
  rant: React.PropTypes.object.isRequired,
  auth: React.PropTypes.object.isRequired,
  postCommentState: React.PropTypes.shape({
    state: React.PropTypes.string.isRequired,
  }).isRequired,
  postComment: React.PropTypes.func.isRequired,
  updateCommentPost: React.PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    postCommentState: state.postCommentState,
    auth: state.auth,
    rant: state.rant.rant.rant,
  };
}

export default connect(mapStateToProps, {
  postComment,
  updateCommentPost,
})(CommentPost);
