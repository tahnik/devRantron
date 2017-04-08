import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  updateCommentPost,
  clearCommentPost,
  addUserCommentPost,
 } from '../../actions/comments';

class CommentPost extends Component {
  render() {
    return (
      <div className="comment_post_container" >
        <textarea
          value={this.props.commentText}
          onChange={e => this.props.updateCommentPost(e.target.value)}
        />
        <button className="btn">Add Comment</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    commentText: state.comments.commentPost,
  };
}

export default connect(mapStateToProps, {
  updateCommentPost,
  clearCommentPost,
  addUserCommentPost,
})(CommentPost);
