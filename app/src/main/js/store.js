import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers/index';
import { setAutoLaunch, setMinimiseOnClose } from './actions/settings';

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
  if (initialState.settings) {
    const generalSettings = initialState.settings.general;
    if (generalSettings.autoLaunch.value === true) {
      setAutoLaunch(true);
    } else {
      setAutoLaunch(false);
    }
    if (generalSettings.minimiseOnClose.value === true) {
      store.dispatch(setMinimiseOnClose(true));
    } else {
      store.dispatch(setMinimiseOnClose(false));
    }
  }
}


// window.onbeforeunload = () => {
//   const state = store.getState();
//   const customCols = [...state.columns];
//   for (let index = 0; index < customCols.length; index += 1) {
//     customCols[index].items = [];
//     customCols[index].prev_set = 0;
//     customCols[index].page = 0;
//   }
//   const savedState = {
//     auth: state.auth,
//     user: state.user,
//     settings: state.settings,
//     notifs: state.notifs,
//     columns: customCols,
//   };
//   localStorage.setItem('savedState', JSON.stringify(savedState));
// };

export default store;
