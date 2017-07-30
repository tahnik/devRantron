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
  renderMutliCol() {
    const { item } = this.state;
    const { theme, vote, cardItem, auth, open } = this.props;
    return (
      <div className="item_column">
        <div
          className="itemcard_container"
          style={{ width: `${theme.column.width}px` }}
        >
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
        </div>
        <div
          className="comments_and_post"
          style={{ width: `${theme.column.width}px` }}
          ref={(node) => { this.multiCol = node; }}
        >
          <Comments
            comments={item.comments}
            theme={theme}
            vote={vote}
            auth={auth}
            open={open}
          />
          <PostComment
            comments={item.comments}
            theme={theme}
            auth={auth}
            id={item.rant.id}
            fetch={() => this.fetchitem(true)}
          />
        </div>
      </div>
    );
  }
  renderSingleColumn() {
    const { item } = this.state;
    const { theme, vote, cardItem, auth, open } = this.props;
    return (
      <div
        className="item_compact_column"
        ref={(node) => { this.compactCol = node; }}
      >
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
        <Comments
          comments={item.comments}
          theme={theme}
          vote={vote}
          auth={auth}
          open={open}
        />
        <PostComment
          comments={item.comments}
          theme={theme}
          id={item.rant.id}
          auth={auth}
          fetch={() => this.fetchitem(true)}
        />
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
