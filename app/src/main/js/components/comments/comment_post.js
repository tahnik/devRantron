/**
 * Used for posting a comment.
 * It uses a reusable Smart area
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import rantscript from '../../consts/rantscript';
import SmartArea from '../utilities/smart_area';

class CommentPost extends Component {
  constructor() {
    super();
    this.state = {
      disabled: false,
      users: [],
      content: '',
    };
  }
  /**
   * Sets up users that have made comments
   * This is used for @mention
   *
   * @memberof CommentPost
   */
  componentWillMount() {
    // We use a set to make sure there's no duplicate users
    const users = new Set();
    const { comments } = this.props;
    for (let i = 0; i < comments.length; i += 1) {
      users.add(comments[i].user_username);
    }
    if (users.size !== 0) {
      this.setState({ users: Array.from(users) });
    }
  }
  /**
   * Posts a comment using rantscript
   *
   * @param {string} text
   * @param {image} image
   * @memberof CommentPost
   */
  onPost(text, image) {
    const { auth, id, fetch } = this.props;
    this.setState({ disabled: true });
    rantscript
      .postComment(text, id, auth.user.authToken, image)
      .then(() => {
        this.setState({ content: '' });
        this.setState({ disabled: false });
        fetch();
      })
      .catch(() => {
        this.setState({ disabled: false });
      });
  }
  render() {
    const { theme, auth } = this.props;
    return (
      <div
        className="post_comment"
        style={{ width: `${theme.column.width - 17}px` }}
      >
        <SmartArea
          id="post_comment_area"
          users={this.state.users}
          placeholder="Add a comment..."
          onPost={(text, image) => this.onPost(text, image)}
          disabled={this.state.disabled || auth.user === null}
          value={this.state.content}
          onChange={text => this.setState({ content: text })}
        />
      </div>
    );
  }
}


CommentPost.propTypes = {
  theme: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
  fetch: PropTypes.func.isRequired,
  comments: PropTypes.array.isRequired,
};

export default CommentPost;
