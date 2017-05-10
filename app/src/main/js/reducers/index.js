import { combineReducers } from 'redux';
import settings from './settings';
import rants from './rants';
import rant from './rant';
import auth from './auth';
import topNav from './nav';
import postCommentState from './comment_post';
import toast from './toast';

const rootReducer = combineReducers({
  settings,
  rants,
  rant,
  auth,
  topNav,
  postCommentState,
  toast,
});

export default rootReducer;
