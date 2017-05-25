import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Notification extends Component {
  render() {
    const { notif, user } = this.props;

    let imageSource = 'res/images/invis.png';
    if (user.avatar.i) {
      imageSource = `https://avatars.devrant.io/${user.avatar.i}`;
    }

    return (
      <div className="notif_bubble" >
        <img alt="" src={imageSource} className="notif_image" style={{ background: `#${user.avatar.b}` }} />
      </div>
    );
  }
}

Notification.propTypes = {
  notif: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default Notification;
