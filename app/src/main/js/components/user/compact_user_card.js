import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CompactUserCard extends Component {
  componentWillMount() {
    const { fetchUser, user } = this.props;
    if (!user.profile) {
      fetchUser();
    }
  }
  render() {
    const { user, login } = this.props;
    if (!user.profile) {
      return (
        <div className="devRant_placeholder">
          <div className="logo">
            <img alt="" src="./res/images/devrant_sidebar.png" />
          </div>
          <div className="item" onClick={() => login()} >
            <i className="ion-log-in" />Login
          </div>
        </div>
      );
    }
    const profile = user.profile;
    let imgsrc = '';
    if (profile.avatar.i) {
      imgsrc += `https://avatars.devrant.io/${profile.avatar.i.replace('c-1', 'c-2')}`.toString();
    }

    return (
      <div
        className="user_compact"
        style={{ background: 'url(./res/images/profile_banner.png)' }}
      >
        <img className="user_image" src={imgsrc} style={{ background: `#${profile.avatar.b}` }} alt="avatar" />
        <div className="user_bg_tint" style={{ background: `#${profile.avatar.b}` }} />
        <div className="logout" onClick={() => this.props.logout()}>
          <i className="ion-log-out" />
        </div>
      </div>
    );
  }
}

CompactUserCard.propTypes = {
  logout: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  fetchUser: PropTypes.func.isRequired,
};

export default CompactUserCard;
