import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers/index';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; //eslint-disable-line
const middleware = applyMiddleware(thunk);

const initialState = () => {
  const persistedState = {};

  const auth = localStorage.getItem('auth');
  if (auth) {
    persistedState.auth = JSON.parse(auth);
  }

  const user = localStorage.getItem('user');
  if (user) {
    persistedState.user = JSON.parse(user);
  }

  const columns = localStorage.getItem('columns');
  if (columns) {
    persistedState.columns = JSON.parse(columns);
  }

  if (persistedState) {
    return persistedState;
  }
  return {};
};

const store = createStore(reducers, initialState(), composeEnhancers(
    middleware,
));

export default store;
