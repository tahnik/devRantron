import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UserCard from './user_card';

class UserBadge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userCardOpen: false,
    };
  }
  openCard() {
    this.setState({ userCardOpen: true });
  }
  closeCard() {
    this.setState({ userCardOpen: false });
  }
  render() {
    const { user, theme, open } = this.props;
    let imageSource = 'res/images/invis.png';
    if (user.avatar.i) {
      imageSource = `https://avatars.devrant.io/${user.avatar.i}`;
    }

    // const c =
    // ['dGFobmlr', 'RGFjZXhp', 'ZGZveA==', 'dHJvZ3Vz'].indexOf(btoa(user.username)) > -1 ?
    // `#${user.avatar.b}` : '#ffffff';

    return (
      <div className="user_badge">
        <div className="image" onClick={() => this.openCard()}>
          { this.state.userCardOpen ? <div className="loadingHalf" /> : null }
          <img alt="" src={imageSource} style={{ background: `#${user.avatar.b}` }} />
        </div>
        {this.state.userCardOpen ?
          <UserCard
            userID={user.id}
            closeCard={() => this.closeCard()}
            open={open}
          /> : null}
        <div className="details" onClick={() => this.openCard()}>
          <p>{user.username}</p>
          <span
            className="score"
            style={{ backgroundColor: theme.backgroundColor }}
          >{user.score}
          </span>
          {user.dpp === 1 &&
          <span
            className="score"
            style={{ color: '#ffffff', background: `#${user.avatar.b}` }}
          ><span>Supporter</span>
          </span>
          }
        </div>
      </div>
    );
  }
}

UserBadge.propTypes = {
  user: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  open: PropTypes.func.isRequired,
};

export default UserBadge;
