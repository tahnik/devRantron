import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers/index';
import {
  setOnStartup,
  setFirstLaunch,
} from './actions/settings';
import updates from './updates';
import DEFAULT_STATE from './consts/default_states';
import IPCHhandlers from './utils/ipcHandlers';

const cmp = require('semver-compare');
const { remote } = require('electron');

// eslint-disable-next-line
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = applyMiddleware(thunk);

const getInitialState = () => {
  const persistedState = localStorage.getItem('savedState');

  if (persistedState) {
    return JSON.parse(persistedState);
  }
  return {};
};

const initialState = getInitialState();

const currentVersion = remote.app.getVersion();
const prevVersion = localStorage.getItem('prevVersion');

if (
  currentVersion && prevVersion
  && !(Object.keys(initialState).length === 0
  && initialState.constructor === Object)
) {
  if (cmp(currentVersion, prevVersion) === 1) {
    const changes = updates[currentVersion];
    if (changes && changes.ADD) {
      const changesToBeAdded = changes.ADD;
      for (let i = 0; i < changesToBeAdded.length; i += 1) {
        const toBeAdded = changesToBeAdded[i].split('.');
        let reference = null;
        let initStateReference = initialState;
        toBeAdded.forEach((element, index) => {
          if (index === 0) {
            reference = DEFAULT_STATE[element];
          } else {
            reference = reference[element];
          }

          if (index === (toBeAdded.length - 1)) {
            initStateReference[element.toLowerCase()] = reference;
          } else {
            initStateReference = initStateReference[element.toLowerCase()];
          }
        });
      }
    }
  }
}

localStorage.setItem('prevVersion', currentVersion);

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
