import { combineReducers } from 'redux';
import theme from './settings';
import rants from './rants';
import rant from './rant';
import auth from './auth';
import topNav from './nav';
import postCommentState from './post_comment';

const rootReducer = combineReducers({
  theme,
  rants,
  rant,
  auth,
  topNav,
  postCommentState,
});

export default rootReducer;
