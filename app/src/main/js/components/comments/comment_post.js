import React, { Component } from 'react';
import PropTypes from 'prop-types';
import rantscript from '../../consts/rantscript';
import ContentEditable from '../utilities/ContentEditable';

let pos = 0;
let active = false;

class CommentPost extends Component {
  constructor() {
    super();
    this.state = {
      text: '',
      disabled: false,
      users: [],
      mentions: [],
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
  handleText(e) {
    const text = e.target.value;
    console.log(e);
    return;
    this.setState({ text });
    const lastChar = text.slice(-1);
    const { users } = this.state;
    if (lastChar === ' ') {
      active = false;
      pos = 0;
    }
    if (lastChar === '@') {
      pos = text.length;
      active = true;
    }
    const mentions = new Set();
    const postCommentArea = document.getElementById('post_comment_area');
    if (active) {
      const searchText = text.substring(pos, text.length);
      const searchTextArray = Array.from(searchText); // Thanks ES6
      if (searchTextArray.length === 0) {
        mentions.add(users);
      } else {
        for (let i = 0; i < users.length; i += 1) {
          let candidate = true;
          for (let j = 0; j < searchTextArray.length; j += 1) {
            if (users[i].indexOf(searchTextArray[j]) === -1) {
              candidate = false;
            }
          }
          if (candidate) {
            mentions.add(users[i]);
          }
        }
      }
      this.setState({ mentions: Array.from(mentions) });
    }
    this.setState({ mentions: [] });
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
        />
        <div className="mentions">
          {
            this.state.mentions.map((user) => {
              console.log(user);
              return <div className="item" key={user}>{user}</div>;
            })
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
