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

      const tempItems = data.items;
      const commentDiscuss = [];
      const commentVote = [];
      const contentVote = [];
      const commentContent = [];
      const commentMention = [];
      const alreadyRead = [];

      tempItems.forEach((notif) => {
        if (notif.read === 1) { alreadyRead.push(notif); return; }
        if (notif.type === 'comment_discuss') { commentDiscuss.push(notif); }
        if (notif.type === 'comment_vote') { commentVote.push(notif); }
        if (notif.type === 'content_vote') { contentVote.push(notif); }
        if (notif.type === 'comment_content') { commentContent.push(notif); }
        if (notif.type === 'comment_mention') { commentMention.push(notif); }
      });

      data.items = [
        ...commentMention,
        ...commentContent,
        ...contentVote,
        ...commentVote,
        ...commentDiscuss,
        ...alreadyRead,
      ];

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
