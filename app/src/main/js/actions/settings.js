import { SETTINGS } from '../consts/types';

const { ipcRenderer } = require('electron');

/**
 * Logs in the user
 *
 * @param {string} username Either username or email
 * @param {string} password Password for the user
 */
const changeGeneral = (primaryKey, secondaryKey, value) => (dispatch) => {
  if (primaryKey === 'autoLaunch') {
    if (value) {
      ipcRenderer.send('auto-launch', true);
    } else {
      ipcRenderer.send('auto-launch', false);
    }
  }
  if (primaryKey === 'minimiseOnClose') {
    if (value) {
      window.onbeforeunload = (e) => {
        ipcRenderer.send('minimiseApp');
        e.returnValue = false;
      };
    } else {
      window.onbeforeunload = () => {};
    }
  }
  dispatch({
    type: SETTINGS.ACTION.CHANGE_GENERAL,
    primaryKey,
    secondaryKey,
    value,
  });
};


/**
 * Logs in the user
 *
 * @param {string} username Either username or email
 * @param {string} password Password for the user
 */
const changeTheme = () => () => {

};


export { changeGeneral, changeTheme };
