import { combineReducers } from 'redux';
import { theme } from './settings';
import { rants } from './rants';

const rootReducer = combineReducers({
  theme,
  rants,
});

export default rootReducer;
