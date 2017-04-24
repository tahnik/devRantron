import {
  FETCH_RANTS,
  RESET_PAGE,
} from '../consts/rants';
import STATE from '../consts/state';

export function loading(type) {
  return {
    type: FETCH_RANTS,
    state: STATE.LOADING,
    feedType: type,
  };
}

export function dumpRants(type, payload) {
  return {
    type: FETCH_RANTS,
    state: STATE.SUCCESS,
    payload,
    feedType: type,
  };
}

export function resetPage() {
  return {
    type: RESET_PAGE,
    state: STATE.SUCCESS,
  };
}

