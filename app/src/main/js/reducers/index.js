import { combineReducers } from 'redux';
import auth from './auth';
import settings from './settings';
import toast from './toast';
import user from './user';
import columns from './columns';
import column from './column';
import modal from './modal';

const devRantron = combineReducers({
  auth,
  settings,
  toast,
  user,
  columns,
  modal,
  column,
});

export default devRantron;
