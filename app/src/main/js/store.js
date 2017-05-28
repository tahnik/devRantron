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
  localStorage.setItem('savedState', JSON.stringify(store.getState()));
};

export default store;
