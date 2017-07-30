import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getNotifText } from '../../consts/utils';

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visable: false,
    };
  }
  shouldComponentUpdate(nextProps) {
    const { notif } = this.props;
    if (
      nextProps.unread === 0 && (notif.read === 1)
    ) {
      return false;
    }
    return true;
  }
  open(id) {
    this.props.open(id);
  }
  render() {
    const { notif, user, unread } = this.props;
    let icon;
    let imageSource = 'res/images/invis.png';

    if (user.avatar.i) {
      imageSource = `https://avatars.devrant.io/${user.avatar.i}`;
    }
    const notifText = getNotifText(notif.type, user.name);
    switch (notif.type) {
      case 'comment_mention':
        icon = 'ion-chatbubble-working';
        break;
      case 'comment_content':
        icon = 'ion-chatbubble-working';
        break;
      case 'comment_discuss':
        icon = 'ion-chatbubbles';
        break;
      case 'comment_vote':
        icon = 'ion-chatbubbles';
        break;
      default:
        icon = 'ion-plus-round';
    }
    return (
      <div
        onClick={() => this.open(notif.rant_id)}
        className="notif_bubble"
      >
        <div className={`notif_badge ${notif.read === 1 ? 'read' : ''}`}>
          <img alt="" src={imageSource} className="notif_image" style={{ background: `#${user.avatar.b}` }} />
          <i
            className={`${icon} ${notif.read === 1 || unread === 0 ? 'read' : ''}`}
          />
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
  open: PropTypes.func.isRequired,
  unread: PropTypes.number.isRequired,
};

export default Notification;
