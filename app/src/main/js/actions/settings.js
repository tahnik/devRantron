import { SETTINGS } from '../consts/types';

const { ipcRenderer } = require('electron');

const setAutoLaunch = (value) => {
  if (value) {
    ipcRenderer.send('auto-launch', true);
  } else {
    ipcRenderer.send('auto-launch', false);
  }
};

const saveUserState = (state) => {
  const customCols = [...state.columns];
  for (let index = 0; index < customCols.length; index += 1) {
    customCols[index].items = [];
    customCols[index].prev_set = 0;
    customCols[index].page = 0;
  }
  const savedState = {
    auth: state.auth,
    user: state.user,
    settings: state.settings,
    notifs: state.notifs,
    columns: customCols,
  };
  localStorage.setItem('savedState', JSON.stringify(savedState));
};

const setOnBeforeUnload = (state, value) => {
  if (value) {
    window.onbeforeunload = (e) => {
      ipcRenderer.send('minimiseApp');
      e.returnValue = false;
    };
  } else {
    window.onbeforeunload = () => {
      saveUserState(state);
    };
  }
};


const setMinimiseOnClose = value => (dispatch, getState) => {
  if (value) {
    setOnBeforeUnload(getState(), true);
  } else {
    setOnBeforeUnload(getState(), false);
  }
};

const setUpdateStatus = value => (dispatch) => {
  if (value) {
    dispatch({
      type: SETTINGS.ACTION.CHANGE_GENERAL,
      primaryKey: 'update',
      buttonText: 'Update availble',
      value: true,
    });
  } else {
    dispatch({
      type: SETTINGS.ACTION.CHANGE_GENERAL,
      primaryKey: '',
      buttonText: 'Up to date',
      value: false,
    });
  }
};


const setFirstLaunch = () => (dispatch) => {
  setAutoLaunch(true);
  dispatch(setMinimiseOnClose(true));
};

const setOnStartup = () => (dispatch, getState) => {
  const generalSettings = getState().settings.general;
  if (generalSettings.autoLaunch.value === true) {
    setAutoLaunch(true);
  } else {
    setAutoLaunch(false);
  }
  if (generalSettings.minimiseOnClose.value === true) {
    dispatch(setMinimiseOnClose(true));
  } else {
    dispatch(setMinimiseOnClose(false));
  }
};


/**
 * Logs in the user
 *
 * @param {string} username Either username or email
 * @param {string} password Password for the user
 */
const changeGeneral = (primaryKey, secondaryKey, value) => (dispatch, getState) => {
  if (primaryKey === 'autoLaunch') {
    setAutoLaunch(value);
  }
  if (primaryKey === 'minimiseOnClose') {
    dispatch(setMinimiseOnClose(value));
  }
  if (primaryKey === 'update') {
    saveUserState(getState());
    ipcRenderer.send('updateNow', true);
  }
  if (primaryKey === 'reset_cache') {
    localStorage.setItem('savedState', JSON.stringify({}));
    ipcRenderer.send('reLaunch', true);
    return;
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


export {
  changeGeneral,
  changeTheme,
  setAutoLaunch,
  setMinimiseOnClose,
  saveUserState,
  setFirstLaunch,
  setOnStartup,
  setUpdateStatus };
