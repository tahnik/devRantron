import React, { Component } from 'react';
import RantComposer from '../post_rant/rant_composer';

class Profile extends Component {
  render() {
    const { user } = this.props;
    const profile = user.profile;
    console.log(this.props)
    let imgsrc = '';
    if (profile.avatar.i) {
      imgsrc += `https://avatars.devrant.io/${profile.avatar.i}`.toString();
    }
    return (
      <div className="profile">
        <div className="profile_header">
          <div
            className="profile_image"
            style={{ background: 'url(./res/images/profile_banner.png)' }}
          >
            <img className="user_image" src={imgsrc} style={{ background: `#${profile.avatar.b}` }} alt="avatar" />
            <div className="user_bg_tint" style={{ background: `#${profile.avatar.b}` }} />
          </div>
          <ul className="profile_description">
            <div className="profile_username">
              <span>{profile.username}</span>
              <p className="user_score">+{profile.score}</p>
            </div>
            {profile.about && <li><i className="ion-person" /><p>{profile.about}</p></li>}
            {profile.skills && <li><i className="ion-code" /><p>{profile.skills}</p></li>}
            {profile.github && <li><i className="ion-social-github" /><p>{profile.github}</p></li>}
            {profile.website && <li><i className="ion-earth" /><p>{profile.website}</p></li>}
            {profile.location && <li><i className="ion-location" /><p>{profile.location}</p></li>}
          </ul>
        </div>
        { /* placeholder until implemented */ }
        <RantComposer />
      </div>
    );
  }
}

export default Profile;
