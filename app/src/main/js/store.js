import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers/index';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; //eslint-disable-line
const middleware = applyMiddleware(thunk);

let initialAuthState = JSON.parse(localStorage.getItem('auth'));

if (initialAuthState === null) {
  initialAuthState = {};
}

const initialState = {
  auth: initialAuthState,
};

export default createStore(reducers, initialState, composeEnhancers(
    middleware,
));
