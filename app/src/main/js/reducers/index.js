import { combineReducers } from 'redux';
import theme from './settings';
import rants from './rants';
import rant from './rant';
import auth from './auth';
import { TopNavItems } from './nav';

const rootReducer = combineReducers({
  theme,
  rants,
  rant,
  auth,
  topNavItems: TopNavItems,
});

export default rootReducer;
