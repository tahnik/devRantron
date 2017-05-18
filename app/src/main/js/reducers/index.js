import { combineReducers } from 'redux';
import auth from './auth';
import settings from './settings';
import toast from './toast';
import user from './user';
import items from './items';

const devRantron = combineReducers({
  auth,
  settings,
  toast,
  user,
  items,
});

export default devRantron;
