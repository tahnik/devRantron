import { combineReducers } from 'redux';
import theme from './settings';
import rants from './rants';
import rant from './rant';
import auth from './auth';

const rootReducer = combineReducers({
  theme,
  rants,
  rant,
  auth,
});

export default rootReducer;
