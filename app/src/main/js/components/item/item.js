/**
 * This renders a rant with it's comments in a modal.
 * It can render rant and comments in a single or double columns
 * based on the width of the window
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ItemCard from './item_card';
import Loading from '../utilities/loading';
import rantscript from '../../consts/rantscript';
import Comments from '../comments/comments';
import PostComment from '../comments/comment_post';

class Item extends Component {
  constructor() {
    super();
    this.state = {
      item: null,
      maxCol: 1,
    };
  }
  /**
   * It receives a rant id via props.
   * Uses that to fetch the rant (or collab)
   *
   * @memberof Item
   */
  componentWillMount() {
    this.fetchitem();
  }
  componentDidMount() {
    this.handleResize();
    this.listener = () => {
      this.handleResize();
    };
    window.addEventListener('resize', this.listener);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.listener);
  }
  handleOnClick(e) {
    if (e.target.className === 'itemcard_container') {
      this.props.close();
    }
  }
  /**
   * This component can render single or double column
   * That is determined by how much width it has
   *
   * @memberof Item
   */
  handleResize() {
    const { theme } = this.props;
    const middleContainer = document.getElementById('item_container');
    let maxCol = 1;
    if (middleContainer) {
      const middleWidth = middleContainer.offsetWidth;
      const nextColumnWidth = parseInt(theme.column.width, 10) + 50;
      maxCol = Math.floor(middleWidth / nextColumnWidth);
    }
    if (this.state.maxCol !== maxCol) {
      this.setState({ maxCol });
    }
  }
  /**
   * Uses rantscript to fetch a rant or collab
   * This is called again when a comment is added.
   * If a comment is added, the comment column is scrolled to bottom
   *
   * @param {boolean} [scrollToBottom=false] If it should scroll to bottom
   * @memberof Item
   */
  fetchitem(scrollToBottom = false) {
    const { cardItem, auth, fetchNotifs } = this.props;
    let authToken = null;
    if (auth.user) {
      authToken = auth.user.authToken;
    }
    rantscript
    .rant(cardItem.id, authToken)
    .then((res) => {
      const item = res;
      this.setState({ item });
      if (this.multiCol && scrollToBottom) {
        this.multiCol.scrollTop = this.multiCol.scrollHeight;
      }
      if (this.compactCol && scrollToBottom) {
        this.compactCol.scrollTop = this.compactCol.scrollHeight;
      }
      fetchNotifs();
    })
    .catch((err) => {
      console.log(err);
    });
  }
  getItemCard() {
    const { item } = this.state;
    const { theme, vote, cardItem, auth, open } = this.props;
    return (
      <ItemCard
        modal
        item={item.rant}
        key={item.rant.id}
        theme={theme}
        vote={vote}
        itemType={cardItem.type}
        auth={auth}
        open={open}
      />
    );
  }
  getComments() {
    const { item } = this.state;
    const { theme, vote, auth, open } = this.props;
    return (
      <Comments
        comments={item.comments}
        theme={theme}
        vote={vote}
        auth={auth}
        open={open}
      />
    );
  }
  getPostComment() {
    const { item } = this.state;
    const { theme, auth } = this.props;
    return (
      <PostComment
        comments={item.comments}
        theme={theme}
        auth={auth}
        id={item.rant.id}
        originalPoster={item.rant.user_username}
        fetch={() => this.fetchitem(true)}
      />
    );
  }
  renderMutliCol() {
    const { theme } = this.props;
    return (
      <div className="item_column">
        <div
          className="itemcard_container"
          style={{ width: `${theme.column.width}px` }}
        >
          {this.getItemCard()}
        </div>
        <div
          className="comments_and_post"
          style={{ width: `${theme.column.width}px` }}
          ref={(node) => { this.multiCol = node; }}
        >
          {this.getComments()}
          {this.getPostComment()}
        </div>
      </div>
    );
  }
  renderSingleColumn() {
    return (
      <div
        className="item_compact_column"
        ref={(node) => { this.compactCol = node; }}
      >
        {this.getItemCard()}
        {this.getComments()}
        {this.getPostComment()}
      </div>
    );
  }
  render() {
    if (!this.state.item) {
      return (
        <div className="item_container modal" id="item_container">
          <Loading />
        </div>
      );
    }
    return (
      <div
        className="item_container modal"
        id="item_container"
        onClick={e => this.handleOnClick(e)}
      >
        { this.state.maxCol === 1 ? this.renderSingleColumn()
          : this.renderMutliCol()
        }
      </div>
    );
  }
}

Item.propTypes = {
  theme: PropTypes.object.isRequired,
  vote: PropTypes.func.isRequired,
  cardItem: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  close: PropTypes.func.isRequired,
  open: PropTypes.func.isRequired,
  fetchNotifs: PropTypes.func.isRequired,
};

export default Item;
