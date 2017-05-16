import React from 'react';
import PropTypes from 'prop-types';

const CompactUserCard = (props) => {
  const { profile } = props.profile;
  let imgsrc = '';
  if (profile.avatar.i) {
    imgsrc += `https://avatars.devrant.io/${profile.avatar.i}`.toString();
  }

  return (
    <div
      className="user_compact"
      style={{ background: 'url(../../../../res/images/profile_banner.png)' }}
    >
      <img className="user_image" src={imgsrc} style={{ background: `#${profile.avatar.b}` }} alt="avatar" />
      <div className="user_bg_tint" style={{ background: `#${profile.avatar.b}` }} />
    </div>
  );
};

CompactUserCard.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default CompactUserCard;
