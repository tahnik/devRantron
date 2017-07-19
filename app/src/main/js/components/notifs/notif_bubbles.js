import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Notification from './notif_bubble';

class NotifBubbles extends Component {
  shouldComponentUpdate(nextProps) {
    const { data } = this.props;
    if (
      data.items.length === nextProps.data.items.length
      && data.num_unread === nextProps.data.num_unread
    ) {
      return false;
    }
    return true;
  }
  render() {
    const { data, open } = this.props;
    return (
      <div className="notif_bubble_container">
        {
          data ? data.items.map((notif, index) =>
            (<Notification
              notif={notif}
              index={index}
              open={open}
              unread={data.num_unread}
              key={`${notif.uid}_${index}`} //eslint-disable-line
              user={data.username_map[notif.uid]}
            />),
          ) : null
        }
      </div>
    );
  }
}

NotifBubbles.propTypes = {
  data: PropTypes.object.isRequired,
  open: PropTypes.func.isRequired,
};

export default NotifBubbles;
