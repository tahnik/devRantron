import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { logger } from 'redux-logger';
import reducers from './reducers/index';

const middleware = applyMiddleware(thunk, logger);

export default createStore(reducers, middleware);
// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(); ???
