import React from 'react';
import CommentItem from './comment_item';
import CommentPost from './comment_post';

function Comments(props) {
  const { comments } = props;
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

Comments.propTypes = {
  comments: React.PropTypes.array.isRequired,
};

export default Comments;
