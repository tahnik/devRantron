import { combineReducers } from 'redux';
import auth from './auth';
import settings from './settings';
import toast from './toast';
import rants from './rants';

const devRantron = combineReducers({
  auth,
  settings,
  toast,
  rants,
});

export default devRantron;
