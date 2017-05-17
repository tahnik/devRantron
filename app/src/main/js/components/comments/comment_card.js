import React from 'react';
import PropTypes from 'prop-types';
import UserBadge from '../user/user_badge';
import BottomBar from '../utilities/bottom_bar';
import { ITEM } from '../../consts/types';


const CommentCard = (props) => {
  const { item, theme, vote } = props;
  const user = {
    avatar: item.user_avatar,
    score: item.user_score,
    id: item.user_id,
    username: item.user_username,
  };
  return (
    <div
      className="comment_card"
      style={{
        backgroundColor: theme.comment_card.backgroundColor,
        color: theme.comment_card.color,
      }}
    >
      <div
        className="top_container"
      >
        <UserBadge user={user} theme={theme} />
        <p>{item.body}</p>
      </div>
      <BottomBar
        score={item.score}
        isUpvoted={item.vote_state}
        vote={vote}
        type={ITEM.COMMENT.NAME}
        id={item.id}
      />
    </div>
  );
};

CommentCard.propTypes = {
  item: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  vote: PropTypes.func.isRequired,
};

export default CommentCard;
