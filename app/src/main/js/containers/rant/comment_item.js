import React, { Component } from 'react';
import { connect } from 'react-redux';
import { upvoteComment } from '../../actions/rant';
import { addUserCommentPost } from '../../actions/comment_post';
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
class CommentItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plusColor: null,
      minusColor: null,
      commentScore: 0,
    };
  }
  componentWillMount() {
    const { comment } = this.props;
    this.setState(
      {
        plusColor: comment.vote_state === 1 ? '#D55161' : null,
        minusColor: comment.vote_state < 0 ? '#D55161' : null,
      },
    );
    this.setState({ commentScore: comment.score });
  }
  upvote(id) {
    this.setState({ plusColor: '#D55161' });
    this.props.upvoteComment(
      id,
      this.props.auth.authToken,
    );
    this.setState({ commentScore: this.state.commentScore + 1 });
  }
  render() {
    const { comment } = this.props;

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
            <button
              onClick={() => this.upvote(comment.id)}
            >
              <i
                style={{ color: this.state.plusColor }}
                className="ion-plus-round"
              />
            </button>
            <p>{this.state.commentScore}</p>
            <i className="ion-minus-round" />
            <div style={{ flex: 1 }} />
            <p>{comment.num_comments}</p>
            <button
              onClick={() => this.props.addUserCommentPost(comment.user_username)}
            >
              <i
                className="ion-reply"
              />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

CommentItem.propTypes = {
  comment: React.PropTypes.object.isRequired,
  addUserCommentPost: React.PropTypes.func.isRequired,
  upvoteComment: React.PropTypes.func.isRequired,
  auth: React.PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}


export default connect(mapStateToProps, {
  addUserCommentPost,
  upvoteComment,
})(CommentItem);
