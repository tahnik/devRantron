import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UserBadge from '../user/user_badge';
import BottomBar from '../utilities/bottom_bar';
import { ITEM } from '../../consts/types';

class ItemCard extends Component {
  open() {
    const { item, open, modal } = this.props;
    if (!modal) {
      open(ITEM.RANT.NAME, item.id);
    }
  }
  render() {
    const { item, theme, vote, modal } = this.props;
    const user = {
      avatar: item.user_avatar,
      score: item.user_score,
      id: item.user_id,
      username: item.user_username,
    };
    const image = item.attached_image;
    return (
      <div
        className={`item_card ${modal ? null : 'shadow'}`}
        style={{
          backgroundColor: theme.item_card.backgroundColor,
          color: theme.item_card.color,
        }}
      >
        <div
          className="top_container"
          onClick={() => this.open()}
        >
          <UserBadge user={user} theme={theme} />
          <p>{item.text}</p>
        </div>
        { image !== '' ? <img alt="" src={image.url} /> : null }
        <BottomBar
          score={item.score}
          comments={item.num_comments}
          isUpvoted={item.vote_state}
          vote={vote}
          id={item.id}
        />
      </div>
    );
  }
}

ItemCard.propTypes = {
  item: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  vote: PropTypes.func.isRequired,
  open: PropTypes.func, // eslint-disable-line
  modal: PropTypes.bool, //eslint-disable-line
};

export default ItemCard;
