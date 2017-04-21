import React, { Component } from 'react';
import CommentItem from './comment_item';
import CommentPost from './comment_post';

class Comments extends Component {
  render() {
    const { comments } = this.props;
    return (
      <div className="col s6 col-comment" >
        <div className="comments_container" id="comments_container">
          {
            comments.map(comment => (
              <CommentItem
                comment={comment}
                key={comment.id}
              />
            ))
          }
        </div>
        <CommentPost />
      </div>
    );
  }
}

Comments.propTypes = {
  comments: React.PropTypes.array.isRequired,
};

export default Comments;
