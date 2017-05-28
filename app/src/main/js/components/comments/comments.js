import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CommentCard from './comment_card';

class Comments extends Component {
  constructor() {
    super();
    this.state = {
      item: null,
    };
  }
  shouldComponentUpdate(nextProps) {
    if (this.props.comments.length === nextProps.comments.length) {
      return false;
    }
    return true;
  }
  render() {
    const { theme, vote, comments } = this.props;
    return (
      <div className="comments_container">
        {
          comments.length === 0 ? <h4>No comments</h4> : null
        }
        {
          comments.map(comment => (
            <CommentCard
              key={comment.id}
              item={comment}
              theme={theme}
              vote={vote}
            />
          ))
        }
      </div>
    );
  }
}

Comments.propTypes = {
  theme: PropTypes.object.isRequired,
  vote: PropTypes.func.isRequired,
  comments: PropTypes.array.isRequired,
};

export default Comments;
