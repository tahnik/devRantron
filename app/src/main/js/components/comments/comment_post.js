import React, { Component } from 'react';
import PropTypes from 'prop-types';
import rantscript from '../../consts/rantscript';

class CommentPost extends Component {
  constructor() {
    super();
    this.state = {
      text: '',
      disabled: false,
    };
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
        <textarea
          value={this.state.text}
          onChange={e => this.setState({ text: e.target.value })}
        />
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
};

export default CommentPost;
