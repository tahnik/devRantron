import React from 'react';
import { connect } from 'react-redux';
import { addUserCommentPost } from '../../actions/rant';
/* API Ref:
attached_image: ""
created_time: 1491178991
edited: false
id: 509276
num_comments: 3
num_downvotes: 0
num_upvotes: 40
score: 40
tags: Array[]
text: ""
user_avatar: Object
user_id: 49546
user_score: 3506
user_username: "DLMousey"
vote_state: 0
*/
function CommentItem(props) {
  const { comment } = props;

  let imageSource = <img src="res/images/empty_avatar.png" alt="" />;

  if (comment.user_avatar.i) {
    imageSource = <img src={`https://avatars.devrant.io/${comment.user_avatar.i}`} alt="" />;
  }
  return (
    <div className="comment_card row" >
      <div className="card blue-grey darken-1">
        <div className="card-user">
          { imageSource }
          <div>
            <p>{comment.user_username}</p>
            <p className="user_score">+{comment.user_score}</p>
          </div>
        </div>
        <div className="card-content white-text">
          <pre><p>{comment.body}</p></pre>
        </div>
        <div className="card-bottomBar">
          <i className="ion-plus-round" />
          <p>{comment.score}</p>
          <i className="ion-minus-round" />
          <div style={{ flex: 1 }} />
          <p>{comment.num_comments}</p>
          <i
            onClick={() => props.addUserCommentPost(comment.user_username)
          } className="ion-reply"
          />
        </div>
      </div>
    </div>
  );
}

CommentItem.propTypes = {
  comment: React.PropTypes.object.isRequired,
  addUserCommentPost: React.PropTypes.func.isRequired,
};


export default connect(null, { addUserCommentPost })(CommentItem);
