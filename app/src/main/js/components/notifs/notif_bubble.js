import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visable: false,
    };
  }
  render() {
    const { notif, user } = this.props;
    let icon;
    let notifText;
    let imageSource = 'res/images/invis.png';

    if (user.avatar.i) {
      imageSource = `https://avatars.devrant.io/${user.avatar.i}`;
    }

    switch (notif.type) {
      case 'comment_mention':
        icon = 'ion-chatbubble-working';
        notifText = `${user.name} mentioned you in a comment.`;
        break;
      case 'comment_content':
        icon = 'ion-chatbubble-working';
        notifText = `${user.name} commented on your rant.`;
        break;
      case 'comment_discuss':
        icon = 'ion-chatbubbles';
        notifText = 'New comments on a rant you follow.';
        break;
      case 'comment_vote':
        icon = 'ion-chatbubbles';
        notifText = `${user.name} +1'd your comment.`;
        break;
      default:
        icon = 'ion-plus-round';
        notifText = `${user.name} +1'd your rant.`;
    }

    return (
      <div className="notif_bubble" >
        <div className={`notif_badge ${(notif.read === 1 ? 'read' : '')}`}>
          <img alt="" src={imageSource} className="notif_image" style={{ background: `#${user.avatar.b}` }} />
          <i className={icon} />
        </div>
        <div className="notif_desc">
          <p>{notifText}</p>
        </div>
      </div>
    );
  }
}

Notification.propTypes = {
  notif: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default Notification;
