import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Notification from './notif_bubble';

class NotifBubbles extends PureComponent {
  render() {
    const { data, open } = this.props;
    if (!data) {
      return <div />;
    }
    return (
      <div className="notif_bubble_container">
        {
          data.items.map((notif, index) =>
            (<Notification
              notif={notif}
              index={index}
              open={open}
              unread={data.num_unread}
              key={`${notif.uid}_${notif.created_time}_${notif.comment_id}_${notif.type}_${notif.rant_id}`} //eslint-disable-line
              user={data.username_map[notif.uid]}
            />),
          )
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
