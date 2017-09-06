import { NOTIFS, ITEM } from '../consts/types';
import rantscript from '../consts/rantscript';
import { openModal } from './modal';
import { fetchUser } from './user';

const { ipcRenderer } = require('electron');
const currentWindow = require('electron').remote.getCurrentWindow();

// This is used to prevent notif being fetched when a notif clearing is in progress
let clearingNotifs = false;
let fetching = false;

/**
 * Fetches notifications
 *
 */
const fetchNotifs = () => (dispatch, getState) => {
  if (clearingNotifs || fetching) {
    return;
  }
  const auth = getState().auth;
  if (!auth.user) {
    return;
  }
  const prevNotifs = getState().notifs;
  const lastCheckTime = 1;
  fetching = true;
  rantscript
    .notifications(auth.user.authToken, lastCheckTime)
    .then((res) => {
      fetching = false;
      let noChange = true;

      if (prevNotifs && prevNotifs.num_unread === res.data.num_unread) {
        const nextnotifItems = res.data.items;
        let j = 0;
        if (nextnotifItems) {
          while (j < nextnotifItems.length) {
            const prevItem = prevNotifs.items[j];
            const nextItem = nextnotifItems[j];
            if (
              prevItem.rant_id !== nextItem.rant_id
        || prevItem.read !== nextItem.read
            ) {
              noChange = false;
              break;
            }
            j += 1;
          }
        }
      } else {
        noChange = false;
      }

      if (noChange) {
        return;
      }
      const notifs = {
        items: res.data.items,
        check_time: res.data.check_time,
        username_map: res.data.username_map,
        num_unread: res.data.num_unread,
      };
      dispatch({
        type: NOTIFS.FETCH,
        notifs,
      });
    })
    .catch(() => {
      fetching = false;
    });
};

/**
 * Marks all the notif as read
 *
 */
const clearNotifs = () => (dispatch, getState) => {
  dispatch({
    type: NOTIFS.CLEARALL,
  });
  const auth = getState().auth;
  if (!auth.user) {
    return;
  }
  clearingNotifs = true;
  rantscript
    .clearNotifications(auth.user.authToken)
    .then(() => {
      clearingNotifs = false;
    })
    .catch(() => {
      clearingNotifs = false;
    });
};


/**
 * This shows a OS notification using HTML5 Notification API
 * This also shows a quick reply window if enabled in the settings
 *
 * @param {object} notif
 */
const showNotifs = notif => (dispatch, getState) => {
  const notifSettings = getState().settings.general.notifications.options;

  /**
   * This is done to update the user score (and the profile)
   * Okay, so this updates the profile but the main purpose is to
   * update the score
   */
  dispatch(fetchUser());

  if (!notifSettings.notif_enabled.value) {
    return;
  }
  if (notifSettings[notif.content.type].value === true) {
    // Show quick reply notif instead
    if (
      (notif.content.type === 'comment_content'
      || notif.content.type === 'comment_mention')
      && notifSettings.quick_reply_enabled.value
    ) {
      ipcRenderer.send('showQRNotif', notif);
      return;
    }
    const commentID = notif.content.comment_id || 0;

    const myNotification = new Notification('devRantron', {
      body: notif.body,
      data: { id: notif.id, commentID },
      icon: 'http://i.imgur.com/iikd00P.png',
      silent: !notifSettings.notif_sound_enabled.value,
    });

    // Open a modal when a user clicks on the notif
    myNotification.onclick = (e) => {
      dispatch(openModal(ITEM.RANT.NAME, e.target.data.id, { commentID: e.target.data.commentID }));
      if (!currentWindow.isVisible()) {
        currentWindow.show();
      }
      currentWindow.focus();
    };
  }
};

export { fetchNotifs, clearNotifs, showNotifs };
