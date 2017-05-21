import { combineReducers } from 'redux';
import auth from './auth';
import settings from './settings';
import toast from './toast';
import user from './user';
import columns from './columns';

const devRantron = combineReducers({
  auth,
  settings,
  toast,
  user,
  columns,
});

export default devRantron;
