import React, { Component } from 'react';
import CommentCard from './comment_card';
import Loading from '../utilities/loading';

class Comments extends Component {
  constructor() {
    super();
    this.state = {
      rant: null,
    };
  }
  componentWillMount() {
  }
  render() {
    const { theme, vote, comments } = this.props;
    return (
      <div className="comments_container">
        {
          comments.map(comment => (
            <CommentCard key={comment.id} item={comment} theme={theme} vote={vote} />
          ))
        }
      </div>
    );
  }
}

Comments.propTypes = {
};

export default Comments;


