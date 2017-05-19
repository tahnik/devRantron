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
  componentWillMount() {
  }
  shouldComponentUpdate() {
    const itemContainer = document.getElementsByClassName('item_compact_column')[0];
    setTimeout(() => {
      itemContainer.scrollTop = itemContainer.scrollHeight;
    }, 200);
    return true;
  }
  render() {
    const { theme, vote, comments } = this.props;
    return (
      <div className="comments_container">
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
