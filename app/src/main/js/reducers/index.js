import { combineReducers } from 'redux';

import { rants } from './rantsReducer';

const rootReducer = combineReducers({
  rants,
});

export default rootReducer;
