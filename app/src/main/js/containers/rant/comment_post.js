import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  updateCommentPost,
  clearCommentPost,
  addUserCommentPost,
 } from '../../actions/rant';

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
    commentText: state.rant.commentPost,
  };
}

export default connect(mapStateToProps, {
  updateCommentPost,
  clearCommentPost,
  addUserCommentPost,
})(CommentPost);
