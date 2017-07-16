import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers/index';
import {
  saveUserState,
  setUpdateStatus,
  setOnStartup,
  setFirstLaunch,
} from './actions/settings';

const { ipcRenderer } = require('electron');

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; //eslint-disable-line
const middleware = applyMiddleware(thunk);

const getInitialState = () => {
  const persistedState = localStorage.getItem('savedState');

  if (persistedState) {
    return JSON.parse(persistedState);
  }
  return {};
};

const initialState = getInitialState();

const store = createStore(reducers, initialState, composeEnhancers(
    middleware,
));

if (initialState) {
  console.log(initialState);
  if (initialState.settings) {
    store.dispatch(setOnStartup());
  } else if (
    Object.keys(initialState).length === 0
    && initialState.constructor === Object
  ) {
    store.dispatch(setFirstLaunch());
  }
}

ipcRenderer.on('quitApp', () => {
  saveUserState(store.getState());
  ipcRenderer.sendSync('forceQuitApp');
});

ipcRenderer.on('newUpdate', () => {
  store.dispatch(setUpdateStatus(true));
});

ipcRenderer.on('upToDate', () => {
  store.dispatch(setUpdateStatus(false));
});

export default store;
