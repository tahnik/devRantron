import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postComment } from '../../actions/rant';
import CommentItem from './comment_item';
import CommentPost from './comment_post';

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commentPostText: '',
    };
  }
  addUserToCommentPost(user) {
    this.setState({
      commentPostText: `${this.state.commentPostText} @${user} `,
    });
  }
  // shouldComponentUpdate() {
  //   return false;
  // }
  render() {
    const { comments, auth, rantId } = this.props;
    return (
      <div className="col s6 col-comment" >
        <div className="comments_container">
          {
            comments.map(comment => (
              <CommentItem
                addUser={user => this.addUser(user)}
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
  auth: React.PropTypes.object.isRequired,
  rantId: React.PropTypes.number.isRequired,
  postComment: React.PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps, { postComment })(Comments);
