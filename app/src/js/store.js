import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import merge from 'deepmerge';
import reducers from './reducers/index';
import {
  setOnStartup,
  setFirstLaunch,
} from './actions/settings';
import DEFAULT_STATE from './consts/default_states';
import IPCHhandlers from './utils/ipcHandlers';

const settings = require('electron-settings');

const cmp = require('semver-compare');
const { remote } = require('electron');

// eslint-disable-next-line
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = applyMiddleware(thunk);

const getInitialState = () => {
  const persistedState = settings.get('currentVersion');

  if (persistedState) {
    return persistedState;
  }
  return {};
};

let initialState = getInitialState();

const currentVersion = remote.app.getVersion();
const prevVersion = settings.get('prevVersion');

if (
  currentVersion && prevVersion
  && !(Object.keys(initialState).length === 0
  && initialState.constructor === Object)
) {
  if (cmp(currentVersion, prevVersion) === 1) {
    initialState = merge(DEFAULT_STATE, initialState);
  }
}

settings.set('prevVersion', currentVersion);

const store = createStore(reducers, initialState, composeEnhancers(
  middleware,
));

if (initialState) {
  if (initialState.settings) {
    store.dispatch(setOnStartup());
  } else if (
    Object.keys(initialState).length === 0
    && initialState.constructor === Object
  ) {
    store.dispatch(setFirstLaunch());
  }
}

IPCHhandlers(store);

export default store;
