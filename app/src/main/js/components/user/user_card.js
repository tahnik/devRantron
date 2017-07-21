import React, { Component } from 'react';
import PropTypes from 'prop-types';
import rantscript from '../../consts/rantscript';
import UserBadge from './user_badge';

class UserCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }
  componentDidMount() {
    const { userID } = this.props;
    if (userID) {
      rantscript.profile(userID)
        .then((res) => {
          console.log(res);
          this.setState({ user: res });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  getUser() {
    if (!this.state.user) {
      return (
        <div className="loading">
          put some loading stuff here
        </div>
      );
    }

    const user = this.state.user;

    let imageSource = 'res/images/invis.png';
    if (user.avatar.i) {
      imageSource = `https://avatars.devrant.io/${user.avatar.i.replace('c-1', 'c-3').replace('png', 'jpg')}`;
    }

    return (
      <div className="user_details">
        <div style={{ display: 'flex' }}>
          <div className="image">
            <img alt="" src={imageSource} style={{ background: `#${user.avatar.b}` }} />
          </div>
          {this.state.userCardOpen ?
            <UserCard userID={user.id} closeCard={() => this.closeCard()} /> : null}
          <div className="details">
            <p>{user.username}</p>
            <span
              className="score"
              style={{ backgroundColor: 'rgb(84, 85, 110)' }}
            >{user.score}</span>
          </div>
        </div>

        <div className="user_details_desc">
          <ul>
            <li><i className="ion-person" /><p>{user.about}</p></li>
          </ul>
        </div>
      </div>
    );
  }
  render() {
    return (
      <div className="user_card" id="user_card">
        <div
          className="close"
          onClick={() => this.props.closeCard()}
        ><i className="ion-android-close" /></div>
        {
          this.getUser()
        }
      </div>
    );
  }
}

UserCard.propTypes = {
  userID: PropTypes.number.isRequired,
  closeCard: PropTypes.func.isRequired,
};

export default UserCard;
