import React from 'react';
import PropTypes from 'prop-types';

const UserBadge = (props) => {
  const { user, theme } = props;
  let imageSource = 'res/images/empty_avatar.png';
  if (user.avatar.i) {
    imageSource = `https://avatars.devrant.io/${user.avatar.i}`;
  }
  return (
    <div className="user_badge" >
      <div className="image">
        <img alt="" src={imageSource} />
      </div>
      <div className="details">
        <p>{user.username}</p>
        <span
          className="score"
          style={{ backgroundColor: theme.user_badge.details_back }}
        >{user.score}</span>
      </div>
    </div>
  );
};

UserBadge.propTypes = {
  user: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default UserBadge;
