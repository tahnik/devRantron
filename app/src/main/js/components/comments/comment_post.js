import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ITEM } from '../../consts/types';
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
      })
      .catch(() => {
        this.setState({ disabled: false });
      });
  }
  render() {
    const { theme } = this.props;
    return (
      <div
        className="post_comment"
        style={{ width: `${theme.column.width - 0.5}rem` }}
      >
        <textarea
          value={this.state.text}
          onChange={e => this.setState({ text: e.target.value })}
        />
        <button
          disabled={this.state.disabled}
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
