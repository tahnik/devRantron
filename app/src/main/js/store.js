import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers/index';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; //eslint-disable-line
const middleware = applyMiddleware(thunk);

const initialState = () => {
  const persistedState = localStorage.getItem('reduxState');
  if (persistedState) {
    return JSON.parse(persistedState);
  }
  return {};
};

const store = createStore(reducers, initialState(), composeEnhancers(
    middleware,
));

store.subscribe(() => {
  localStorage.setItem('reduxState', JSON.stringify(store.getState()));
});

export default store;
