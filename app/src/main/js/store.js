import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers/index';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; //eslint-disable-line
const middleware = applyMiddleware(thunk);

const initialState = () => {
  const persistedState = localStorage.getItem('savedState');

  if (persistedState) {
    return JSON.parse(persistedState);
  }
  return {};
};

const store = createStore(reducers, initialState(), composeEnhancers(
    middleware,
));

window.onbeforeunload = () => {
  const state = store.getState();
  const customCols = [ ...state.columns ];
  for (let index = 0; index < customCols.length ; index += 1) {
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
  }
  console.log(savedState);
  localStorage.setItem('savedState', JSON.stringify(savedState));
};

export default store;
