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
  render() {
    const { theme, vote, comments, auth, open, addMention, showToast, fetchitem } = this.props;
    return (
      <div className="comments_container">
        <div className="comments">
          {
            comments.length === 0 ?
              <div style={{ width: `${theme.column.width}px`, marginRight: '0.5rem' }}>
                <h4>No comments</h4>
              </div>
              : null
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
                showToast={showToast}
                fetchitem={fetchitem}
                onEdit={this.props.onEdit}
              />
            ))
          }
        </div>
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
  showToast: PropTypes.func.isRequired,
  fetchitem: PropTypes.func.isRequired,
};

export default Comments;
