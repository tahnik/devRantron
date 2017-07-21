import React, { Component } from 'react';
import PropTypes from 'prop-types';
import rantscript from '../../consts/rantscript';

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
    return (
      <div className="user_details">
        Put all the user details here
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
