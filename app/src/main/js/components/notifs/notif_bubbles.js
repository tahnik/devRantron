import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Notification from './notif_bubble';

class NotifBubbles extends Component {
  shouldComponentUpdate(nextProps) {
    if (this.props.data.items.length === nextProps.data.items.length) {
      return false;
    }
    return true;
  }
  render() {
    const { data } = this.props;
    return (
      <div>
        {
          data ? data.items.map((notif, index) =>
            (<Notification
              notif={notif}
              index={index}
              key={`${notif.rant_id}_${notif.uid}_${notif.type}_${Math.random()}`}
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
};

export default NotifBubbles;
