import { combineReducers } from 'redux';
import auth from './auth';
import settings from './settings';
import toast from './toast';
import rants from './rants';
import user from './user';
import stories from './stories';

const devRantron = combineReducers({
  auth,
  settings,
  toast,
  rants,
  user,
  stories,
});

export default devRantron;
