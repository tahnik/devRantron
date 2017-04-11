import React, { Component } from 'react';
import { connect } from 'react-redux';
import CommentItem from './comment_item';
import CommentPost from './comment_post';
import { closeRant } from '../../actions/rant';

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commentPostText: '',
    };
  }
  render() {
    const { comments } = this.props;
    console.log(comments);
    return (
      <div className="col s6 col-comment" >
        <div className="comments_container">
          {
            comments.map(comment => (
              <CommentItem addUser={user => this.addUser(user)} comment={comment} key={comment.id} />
            ))
          }
        </div>
        <CommentPost />
      </div>
    );
  }
}

export default Comments;
