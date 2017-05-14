import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UserBadge from '../user/user_badge';
import BottomBar from '../utilities/bottom_bar';

class Rants extends Component {
  render() {
    const { item, theme, vote, fetchItem } = this.props;
    const user = {
      avatar: item.user_avatar,
      score: item.user_score,
      id: item.user_id,
      username: item.user_username,
    };
    const image = item.attached_image;
    return (
      <div
        className="rant_card"
        style={{
          backgroundColor: theme.rant_card.backgroundColor,
          color: theme.rant_card.color,
        }}
      >
        <div className="top_container" onClick={() => fetchItem(item.id)}>
          <UserBadge user={user} theme={theme} />
          <p>{item.text}</p>
        </div>
        { image !== '' ? <img alt="" src={image.url} /> : null }
        <BottomBar
          score={item.score}
          comments={item.num_comments}
          isUpvoted={item.vote_state}
          vote={vote}
          rantID={item.id}
        />
      </div>
    );
  }
}

Rants.propTypes = {
  item: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  vote: PropTypes.func.isRequired,
  fetchItem: PropTypes.func.isRequired,
};

export default Rants;
