import { NOTIFS, ITEM } from '../consts/types';
import rantscript from '../consts/rantscript';
import { openModal } from './modal';
import { fetchUser } from './user';

const { ipcRenderer } = require('electron');

const currentWindow = require('electron').remote.getCurrentWindow();

let clearingNotif = false;

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

  });
};

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

const showNotifs = notif => (dispatch, getState) => {
  const notifSettings = getState().settings.general.notifications.options;

  dispatch(fetchUser());

  if (!notifSettings.notif_enabled.value) {
    return;
  }
  if (notifSettings[notif.content.type].value === true) {
    // Show quick reply notif instead
    if (notif.content.type === 'comment_content' || notif.content.type === 'comment_mention') {
      ipcRenderer.send('showQRNotif', notif);
      return;
    }

    const myNotification = new Notification('devRantron', {
      body: notif.body,
      data: notif.id,
      icon: 'http://i.imgur.com/iikd00P.png',
      silent: !notifSettings.notif_sound_enabled.value,
    });

    myNotification.onclick = (e) => {
      dispatch(openModal(ITEM.RANT.NAME, e.target.data));
      currentWindow.show();
      currentWindow.focus();
    };
  }
};

export { fetchNotifs, clearNotifs, showNotifs }; //eslint-disable-line
