import { combineReducers } from 'redux';
import auth from './auth';
import settings from './settings';
import toast from './toast';

const devRantron = combineReducers({
  auth,
  settings,
  toast,
});

export default devRantron;
