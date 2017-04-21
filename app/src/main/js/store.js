import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers/index';
import { DEFAULT_STATE } from './reducers/auth';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; //eslint-disable-line
const middleware = applyMiddleware(thunk);

let initialAuthState = JSON.parse(localStorage.getItem('auth'));

if (initialAuthState === null) {
  initialAuthState = DEFAULT_STATE;
}

const initialState = {
  auth: initialAuthState,
};

export default createStore(reducers, initialState, composeEnhancers(
    middleware,
));
