import { NOTIFS, ITEM } from '../consts/types';
import rantscript from '../consts/rantscript';
import { openModal } from './modal';
import { fetchUser } from './user';
import showToast from './toast';

const { ipcRenderer } = require('electron');
const currentWindow = require('electron').remote.getCurrentWindow();

// This is used to prevent notif being fetched when a notif clearing is in progress
let clearingNotif = false;

/**
 * Fetches notifications
 *
 */
const fetchNotifs = () => (dispatch, getState) => {
  const auth = getState().auth;
  if (!auth.user) {
    return;
  }
  rantscript
  .notifications(auth.user.authToken, 1)
  .then((res) => {
    /*
    * We have got a successful response, let's dispatch to let
    * redux store know about it
    */
    const notifs = {
      items: res.data.items,
      check_time: res.data.check_time,
      username_map: res.data.username_map,
      num_unread: res.data.num_unread,
    };
    if (!clearingNotif) {
      dispatch({
        type: NOTIFS.FETCH,
        notifs,
      });
    }
  })
  .catch(() => {
    dispatch(showToast('Could not fetch notifications'));
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
  clearingNotif = true;
  rantscript
  .clearNotifications(auth.user.authToken)
  .then(() => {
    clearingNotif = false;
  })
  .catch(() => {
    clearingNotif = false;
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
      currentWindow.show();
      currentWindow.focus();
    };
  }
};

export { fetchNotifs, clearNotifs, showNotifs };
