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
  componentDidMount() {
    const { user } = this.props;
    const profile = user.profile;
    let imgsrc = './res/images/empty_avatar.png';
    if (profile && profile.avatar.i) {
      imgsrc = `https://avatars.devrant.io/${profile.avatar.i.replace('c-1', 'c-2')}`.toString();
    } else {
      return;
    }
    const reload = setInterval(() => {
      const profilePicture = new Image();
      profilePicture.onload = () => {
        window.clearInterval(reload);
        this.profilePicture.src = profilePicture.src;
      };
      profilePicture.src = imgsrc;
    }, 1000);
  }
  componentDidUpdate() {
    const { user } = this.props;
    const profile = user.profile;
    if (!this.profilePicture) {
      return;
    }
    const indexOfEmpty = this.profilePicture.src.indexOf('empty_avatar');
    if (indexOfEmpty === -1) {
      return;
    }
    let imgsrc = '';
    if (profile && profile.avatar.i) {
      imgsrc = `https://avatars.devrant.io/${profile.avatar.i.replace('c-1', 'c-2')}`.toString();
    }
    const profilePicture = new Image();
    profilePicture.onload = () => {
      this.profilePicture.src = profilePicture.src;
    };
    profilePicture.src = imgsrc;
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
    const { user, login, theme } = this.props;
    const scoreback = theme.comment_card.backgroundColor === '#FFFFFF' ? '#000000' : theme.comment_card.backgroundColor;
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
    const imgsrc = './res/images/empty_avatar.png';

    return (
      <div
        className="user_compact"
        style={{ background: 'url(./res/images/profile_banner.png)' }}
        onClick={() => this.props.open(ITEM.PROFILE.NAME, profile.id)}
      >
        <div
          className="user_image_container"
        >
          <img
            className="user_image"
            src={imgsrc}
            ref={(node) => { this.profilePicture = node; }}
            style={{ background: `#${profile.avatar.b}` }}
            alt="avatar"
          />
        </div>
        <div
          className="name_and_score"
          onClick={() => this.props.open(ITEM.PROFILE.NAME, profile.id)}
        >
          <div className="name">
            {profile.username}
          </div>
          <div
            className="score"
            style={{ backgroundColor: scoreback }}
          >
            <p>+{profile.score}</p>
          </div>
        </div>
        <div className="user_bg_tint" style={{ background: `#${profile.avatar.b}` }} />
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
  theme: PropTypes.object.isRequired,
};

export default CompactUserCard;
