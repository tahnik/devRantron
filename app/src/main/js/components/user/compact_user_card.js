import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ITEM } from '../../consts/types';

class CompactUserCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirm: false,
    };
  }
  componentWillMount() {
    const { fetchUser, user } = this.props;
    if (!user.profile) {
      fetchUser();
    }
  }
  mouseOut() {
    this.setState({ confirm: false });
    this.logoutButton.setAttribute('data-text', 'Logout');
  }
  logout() {
    if (this.state.confirm) {
      this.props.logout();
    } else {
      this.setState({ confirm: true });
      this.logoutButton.setAttribute('data-text', 'Are you sure?');
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
        <div
          className="user_image_container"
          onClick={() => this.props.open(ITEM.PROFILE.NAME, profile.id)}
        >
          <img className="user_image" src={imgsrc} style={{ background: `#${profile.avatar.b}` }} alt="avatar" />
        </div>
        <div
          className="name_and_score"
          onClick={() => this.props.open(ITEM.PROFILE.NAME, profile.id)}
        >
          <div className="name">
            {profile.username}
          </div>
          <div className="score">
            <p>+{profile.score}</p>
          </div>
        </div>
        <div className="user_bg_tint" style={{ background: `#${profile.avatar.b}` }} />
        <div
          className="logout"
          ref={(node) => { this.logoutButton = node; }}
          data-text="Logout"
          onClick={e => this.logout(e)}
          onMouseOut={() => this.onMouseOut()}
        >
          <i className="ion-log-out" />
        </div>
      </div>
    );
  }
}

CompactUserCard.propTypes = {
  logout: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  open: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  fetchUser: PropTypes.func.isRequired,
};

export default CompactUserCard;
