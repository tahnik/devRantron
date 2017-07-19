import {
  saveUserState,
  setUpdateStatus,
} from '../actions/settings';
import rantscript from '../consts/rantscript';

const { ipcRenderer } = require('electron');

export default (store) => {
  ipcRenderer.on('quitApp', () => {
    store.dispatch(saveUserState());
    ipcRenderer.sendSync('forceQuitApp');
  });

  ipcRenderer.on('newUpdate', () => {
    store.dispatch(setUpdateStatus(true));
    // eslint-disable-next-line
    const notification = new Notification('devRantron', {
      body: 'New update is availble. You can install it from settings',
      icon: 'http://i.imgur.com/iikd00P.png',
    });
  });

  ipcRenderer.on('upToDate', () => {
    store.dispatch(setUpdateStatus(false));
  });

  ipcRenderer.on('notifReply', (event, args) => {
    const auth = store.getState().auth;
    rantscript
      .postComment(args.message, args.rantid, auth.user.authToken)
      .then(() => {
      })
      .catch(() => {
      });
  });
};

