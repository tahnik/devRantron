import { combineReducers } from 'redux';
import { theme } from './settings';
import { rants } from './rants';
import { rant } from './rant';
import { comments } from './comments';

const rootReducer = combineReducers({
  theme,
  rants,
  rant,
  comments,
});

export default rootReducer;
