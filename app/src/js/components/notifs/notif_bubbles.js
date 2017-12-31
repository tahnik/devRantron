import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Notification from './notif_bubble';

class NotifBubbles extends PureComponent {
  render() {
    const { data, open } = this.props;

    console.log('render');

    if (!data) {
      return <div />;
    }

    if (this.props.sort) {
      console.time('qualitySort');
      const worth = {
        comment_discuss: 0,
        comment_vote: 1,
        content_vote: 2,
        comment_content: 3,
        comment_mention: 4,
      };
      const tempItems = data.items;
      tempItems.sort((a, b) => {
        if (a.read === 1) { return 1; }
        console.log(a.type, worth[a.type] >= worth[b.type], worth[a.type], worth[b.type])
        if (worth[a.type] >= worth[b.type]) { return -1; }
        return -1;
      });
      data.items = tempItems;
      console.timeEnd('qualitySort');
    } else {
      console.time('timeSort');
      const tempItems = data.items;
      tempItems.sort((a, b) => {
        return b.created_time - a.created_time;
      });
      data.items = tempItems;
      console.timeEnd('timeSort'); 
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
  sort: PropTypes.object.isRequired,
  open: PropTypes.func.isRequired,
};

export default NotifBubbles;
