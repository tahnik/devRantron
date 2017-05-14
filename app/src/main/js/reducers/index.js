import { combineReducers } from 'redux';
import auth from './auth';
import settings from './settings';
import toast from './toast';
import rants from './rants';
import items from './items';

const devRantron = combineReducers({
  auth,
  settings,
  toast,
  rants,
  items,
});

export default devRantron;
