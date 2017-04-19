import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  postComment,
} from '../../actions/rant';

class CommentPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commentPostText: '',
    };
  }
  render() {
    return (
      <div className="comment_post_container" >
        <textarea
          value={this.state.commentPostText}
          onChange={e => this.setState({ commentPostText: e.target.value })}
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
  postComment: React.PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    commentText: state.rant.commentPostText,
    auth: state.auth,
    rant: state.rant.rant.rant,
  };
}

export default connect(mapStateToProps, {
  postComment,
})(CommentPost);