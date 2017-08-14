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
  const stateNotifs = getState().notifs;
  let lastCheckTime = 1;
  let lastItems = [];
  let lastUsers = [];
  if (stateNotifs && stateNotifs.check_time) {
    lastItems = stateNotifs.items;
    lastUsers = stateNotifs.username_map;
    if (lastItems.length !== 0) {
      lastCheckTime = stateNotifs.check_time;
    }
  }
  fetching = true;
  rantscript
  .notifications(auth.user.authToken, lastCheckTime)
  .then((res) => {
    fetching = false;
    /*
    * We have got a successful response, let's dispatch to let
    * redux store know about it
    */
    if (res.data.items.length === 0) {
      return;
    }
    const nextItems = [...lastItems];
    const resItems = res.data.items;
    for (let i = resItems.length; i >= 0; i -= 1) {
      const element = resItems[i];
      const duplicate = lastItems.find(item => item.created_time === element.created_time);
      if (typeof duplicate === 'undefined') {
        if (lastCheckTime === 1) {
          nextItems.push(element);
        } else {
          nextItems.unshift(element);
        }
      } else {
        console.log('Leviosaaaaaaa');
      }
    }
    const notifs = {
      items: nextItems.slice(0, 100),
      check_time: res.data.check_time,
      username_map: { ...res.data.username_map, ...lastUsers },
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
 * Clears the notifications associated with a particular rant id
 * @param {number} id id of a rant
 */
const clearNotif = id => (dispatch, getState) => {
  const prevNotifs = { ...getState().notifs };
  const nextItems = [...prevNotifs.items];
  let nextNumUnread = prevNotifs.num_unread;
  for (let i = 0; i < nextItems.length; i += 1) {
    const item = nextItems[i];
    if (item.rant_id === id) {
      if (!item.read) {
        item.read = 1;
        nextNumUnread -= 1;
      }
    }
  }
  const notifs = {
    items: nextItems,
    check_time: Date.now() / 1000,
    username_map: prevNotifs.username_map,
    num_unread: nextNumUnread,
  };
  dispatch({
    type: NOTIFS.FETCH,
    notifs,
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

export { fetchNotifs, clearNotifs, showNotifs, clearNotif };
