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
  const state = store.getState();
  const persistedState = {
    auth: state.auth,
    settings: state.settings,
    user: state.user,
    columns: state.columns,
  };
  localStorage.setItem('reduxState', JSON.stringify(persistedState));
});



export default store;
