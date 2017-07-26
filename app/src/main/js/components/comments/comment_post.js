import React, { Component } from 'react';
import PropTypes from 'prop-types';
import rantscript from '../../consts/rantscript';
import ContentEditable from '../utilities/ContentEditable';

class CommentPost extends Component {
  constructor() {
    super();
    this.state = {
      text: '',
      disabled: false,
      users: [],
      mentions: [],
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
  handleText() {
    this.setState({ content: this.node.innerText });
  }
  onPost() {
    const { auth, id, fetch } = this.props;
    this.setState({ disabled: true });
    rantscript
      .postComment(this.state.text, id, auth.user.authToken)
      .then(() => {
        this.setState({ text: '' });
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
        <ContentEditable
          contentEditable="true"
          id="post_comment_area"
          users={this.state.users}
        />
        <div className="mentions">
          {
            this.state.mentions.map(user => <div className="item" key={user}>{user}</div>)
          }
        </div>
        <button
          disabled={this.state.disabled || auth.user === null}
          onClick={() => this.onPost()}
        >Add Comment</button>
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
