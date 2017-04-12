import { combineReducers } from 'redux';
import theme from './settings';
import rants from './rants';
import rant from './rant';

const rootReducer = combineReducers({
  theme,
  rants,
  rant,
});

export default rootReducer;
