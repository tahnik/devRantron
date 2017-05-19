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
      mainWidth: 0,
      item: null,
    };
  }
  componentWillMount() {
    this.fetchitem();
  }
  fetchitem() {
    const { cardItem, auth } = this.props;
    let authToken = null;
    if (auth.user) {
      authToken = auth.user.authToken;
    }
    rantscript
    .rant(cardItem.id, authToken)
    .then((res) => {
      const item = res;
      this.setState({ item });
    })
    .catch(() => {
    });
  }
  renderSingleColumn() {
    const { item } = this.state;
    const { theme, vote, auth, cardItem } = this.props;
    return (
      <div className="item_compact_column">
        <ItemCard
          modal
          item={item.rant}
          key={item.rant.id}
          theme={theme}
          vote={vote}
          itemType={cardItem.type}
        />
        <Comments comments={item.comments} theme={theme} vote={vote} />
        <PostComment
          theme={theme}
          auth={auth}
          id={item.rant.id}
          fetch={() => this.fetchitem()}
        />
      </div>
    );
  }
  render() {
    return (
      <div className="item_container modal">
        { this.state.item ? this.renderSingleColumn() : <Loading /> }
      </div>
    );
  }
}

Item.propTypes = {
  theme: PropTypes.object.isRequired,
  vote: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  cardItem: PropTypes.object.isRequired,
};

export default Item;
