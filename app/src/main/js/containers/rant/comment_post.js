import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  postComment,
  updateCommentPost,
} from '../../actions/post_comment';

class CommentPost extends Component {
  render() {
    return (
      <div className="comment_post_container" >
        <textarea
          value={this.props.postCommentState.text}
          onChange={e => this.props.updateCommentPost(e.target.value)}
        />
        <button
          onClick={() => this.props.postComment(
            this.state.commentPostText,
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
  postCommentState: React.PropTypes.object.isRequired,
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
