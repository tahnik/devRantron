import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers/index';
import { DEFAULT_STATE } from './reducers/auth';
import { INITIAL_STATE } from './reducers/settings';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; //eslint-disable-line
const middleware = applyMiddleware(thunk);

let initialAuthState = JSON.parse(localStorage.getItem('auth'));
let initialSettingsState = JSON.parse(localStorage.getItem('settings'));

if (initialAuthState === null) {
  initialAuthState = DEFAULT_STATE;
}

if (initialSettingsState === null) {
  initialSettingsState = INITIAL_STATE;
}

const initialState = {
  auth: initialAuthState,
  settings: initialSettingsState,
};

export default createStore(reducers, initialState, composeEnhancers(
    middleware,
));
