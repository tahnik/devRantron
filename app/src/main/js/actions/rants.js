import rantscript from '../consts/rantscript';
import {
  FETCH_RANTS,
  RESET_PAGE,
} from '../consts/rants';
import STATE from '../consts/state';


export function fetch(type, amount, page = 0, authToken = null) {
  return (dispatch) => {
    dispatch({
      type: FETCH_RANTS,
      state: STATE.LOADING,
      feedType: type,
    });
    rantscript
      .rants(type, amount, page, authToken)
      .then((res) => {
        dispatch({
          type: FETCH_RANTS,
          state: STATE.SUCCESS,
          payload: res,
          feedType: type,
        });
      });
      /*
      TODO: This needs to be fixed. Commented until @rekkyrek fixes the API
      .catch((err) => {
        dispatch({ type: FETCH_RANTS, state: STATE.FAILED, payload: err, feedType: type });
      });
      */
  };
}

export function fetchCollabs(type, amount, page = 0, authToken = null) {
  return (dispatch) => {
    dispatch({
      type: FETCH_RANTS,
      state: STATE.LOADING,
      feedType: type,
    });
    rantscript
      .collabs(type, amount, page, authToken)
      .then((res) => {
        dispatch({
          type: FETCH_RANTS,
          state: STATE.SUCCESS,
          payload: res,
          feedType: type,
        });
      });
      /*
      TODO: This needs to be fixed. Commented until @rekkyrek fixes the API
      .catch((err) => {
        dispatch({ type: FETCH_RANTS, state: STATE.FAILED, payload: err, feedType: type });
      });
      */
  };
}

export function resetPage() {
  return (dispatch) => {
    dispatch({
      type: RESET_PAGE,
      state: STATE.SUCCESS,
    });
  };
}
