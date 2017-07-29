import React, { Component } from 'react';
import PropTypes from 'prop-types';
import rantscript from '../../consts/rantscript';
import SmartArea from '../utilities/SmartArea';

class CommentPost extends Component {
  constructor() {
    super();
    this.state = {
      disabled: false,
      users: [],
      content: '',
    };
  }
  componentWillMount() {
    const users = new Set();
    const { comments } = this.props;
    for (let i = 0; i < comments.length; i += 1) {
      users.add(comments[i].user_username);
    }
    if (users.size !== 0) {
      this.setState({ users: Array.from(users) });
    }
  }
  onPost(text) {
    const { auth, id, fetch } = this.props;
    this.setState({ disabled: true });
    rantscript
      .postComment(text, id, auth.user.authToken)
      .then(() => {
        this.setState({ content: '' });
        this.setState({ disabled: false });
        fetch();
        const itemContainer = document.getElementsByClassName('item_compact_column')[0];
        setTimeout(() => {
          itemContainer.scrollTop = itemContainer.scrollHeight;
        }, 200);
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
          onPost={text => this.onPost(text)}
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
