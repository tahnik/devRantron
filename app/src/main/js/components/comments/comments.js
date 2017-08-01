/**
 * Renders comments in a item modal.
 * Uses reusable item cards
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ItemCard from '../item/item_card';

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
    const { theme, vote, comments, auth, open, addMention } = this.props;
    return (
      <div className="comments_container">
        {
          comments.length === 0 ? <h4>No comments</h4> : null
        }
        {
          comments.map(comment => (
            <ItemCard
              key={comment.id}
              item={comment}
              theme={theme}
              vote={vote}
              auth={auth}
              open={open}
              addMention={addMention}
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
  open: PropTypes.func.isRequired,
  comments: PropTypes.array.isRequired,
  auth: PropTypes.object.isRequired,
  addMention: PropTypes.func.isRequired,
};

export default Comments;
