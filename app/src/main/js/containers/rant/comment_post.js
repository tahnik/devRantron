import React from 'react';
import { connect } from 'react-redux';
import {
  updateCommentPost,
  clearCommentPost,
  addUserCommentPost,
  postComment,
} from '../../actions/rant';

function CommentPost(props) {
  console.log(props)
  return (
    <div className="comment_post_container" >
      <textarea
        value={props.commentText}
        onChange={e => props.updateCommentPost(e.target.value)}
      />
      <button
        onClick={() => props.postComment(
          props.commentText,
          props.rant.id,
          props.auth.id,
          props.auth.token,
          props.auth.user_id,
        )}
        className="btn"
      >Add Comment</button>
    </div>
  );
}

CommentPost.propTypes = {
  commentText: React.PropTypes.string.isRequired,
  updateCommentPost: React.PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    commentText: state.rant.commentPostText,
    auth: state.auth,
    rant: state.rant.rant.rant,
  };
}

export default connect(mapStateToProps, {
  updateCommentPost,
  clearCommentPost,
  addUserCommentPost,
  postComment,
})(CommentPost);
