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
const fetchNotifs = (refresh = false) => (dispatch, getState) => {
  if (clearingNotifs || fetching) {
    return;
  }
  const auth = getState().auth;
  if (!auth.user) {
    return;
  }
  const prevNotifs = getState().notifs;
  let lastCheckTime = 1;
  if (prevNotifs && !refresh) {
    lastCheckTime = getState().notifs.check_time;
  }
  fetching = true;
  rantscript
    .notifications(auth.user.authToken, lastCheckTime)
    .then((res) => {
      console.time('someFunction');
      fetching = false;
      let currentNumUnread = res.data.num_unread;
      if (prevNotifs) {
        currentNumUnread = 0;
        for (let j = 0; j < prevNotifs.items.length; j += 1) {
          if (prevNotifs.items[j].read === 0) {
            currentNumUnread += 1;
          }
        }
      }
      if (
        prevNotifs
        && res.data.num_unread === prevNotifs.num_unread
        && res.data.num_unread === currentNumUnread
        && res.data.items.length === 0
      ) {
        console.timeEnd('someFunction');
        return;
      }
      if (
        prevNotifs
        && res.data.num_unread !== prevNotifs.num_unread
        && res.data.num_unread !== currentNumUnread
        && !refresh
      ) {
        console.timeEnd('someFunction');
        dispatch(fetchNotifs(true));
        return;
      }
      let items = null;
      let usernameMap = null;
      if (lastCheckTime === 1 && !prevNotifs) {
        items = res.data.items;
        usernameMap = res.data.username_map;
      } else {
        items = [...res.data.items, ...prevNotifs.items].slice(0, 99);
        usernameMap = { ...res.data.username_map, ...prevNotifs.username_map };
      }
      const notifs = {
        items,
        check_time: res.data.check_time,
        username_map: usernameMap,
        num_unread: res.data.num_unread,
      };
      console.timeEnd('someFunction');
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
