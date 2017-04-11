import React from 'react';
import { connect } from 'react-redux';
import {
  updateCommentPost,
  clearCommentPost,
  addUserCommentPost,
 } from '../../actions/rant';

function CommentPost(props) {
  return (
    <div className="comment_post_container" >
      <textarea
        value={props.commentText}
        onChange={e => props.updateCommentPost(e.target.value)}
      />
      <button className="btn">Add Comment</button>
    </div>
  );
}

CommentPost.propTypes = {
  commentText: React.PropTypes.string.isRequired,
  updateCommentPost: React.PropTypes.func.isRequired,
};

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
