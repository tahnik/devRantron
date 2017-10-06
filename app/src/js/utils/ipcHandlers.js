import {
  saveUserState,
  setUpdateStatus,
} from '../actions/settings';
import { openModal } from '../actions/modal';
import { ITEM } from '../consts/types';
import rantscript from '../consts/rantscript';

const { ipcRenderer, shell } = require('electron');

export default (store) => {
  ipcRenderer.on('quitApp', () => {
    store.dispatch(saveUserState());
    ipcRenderer.sendSync('forceQuitApp');
  });

  ipcRenderer.on('newUpdate', () => {
    store.dispatch(setUpdateStatus(true));
  });

  ipcRenderer.on('upToDate', () => {
    store.dispatch(setUpdateStatus(false));
  });

  ipcRenderer.on('open-profile', (e, data) => {
    store.dispatch(openModal(ITEM.PROFILE.NAME, data.user));
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

