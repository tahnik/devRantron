import React from 'react';
import PropTypes from 'prop-types';
import Twemoji from 'react-twemoji';
import UserBadge from '../user/user_badge';
import BottomBar from '../utilities/bottom_bar';
import { ITEM } from '../../consts/types';

function timeSince(date) {
  const seconds = Math.floor((new Date() - date) / 1000);
  let interval = seconds / 2592000;
  if (interval > 1) {
    const nd = new Date(date);
    return `${nd.getDate()}/${nd.getMonth()}/${nd.getYear().toString().substring(1)}`;
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return `${Math.floor(interval)}d`;
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return `${Math.floor(interval)}h`;
  }
  interval = seconds / 60;
  if (interval > 1) {
    return `${Math.floor(interval)}m`;
  }
  return `${Math.floor(seconds)}s`;
}

const CommentCard = (props) => {
  const { item, theme, vote, auth, open } = props;
  const user = {
    avatar: item.user_avatar,
    score: item.user_score,
    id: item.user_id,
    username: item.user_username,
  };
  let isUser = false;
  if (auth.user) {
    isUser = auth.user.authToken.user_id === item.user_id;
  }
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
        <UserBadge user={user} theme={theme} open={open} />
        <span className="timesince">{timeSince(item.created_time * 1000)}</span>
        <Twemoji><p>{item.body}</p></Twemoji>
      </div>
      <BottomBar
        score={item.score}
        isUpvoted={item.vote_state}
        vote={vote}
        type={ITEM.COMMENT.NAME}
        id={item.id}
        isUser={isUser}
      />
    </div>
  );
};

CommentCard.propTypes = {
  item: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  vote: PropTypes.func.isRequired,
  open: PropTypes.func.isRequired,
};

export default CommentCard;
