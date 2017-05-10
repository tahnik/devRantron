import rantscript from '../consts/rantscript';
import {
  FETCH_RANTS,
  RESET_PAGE,
  STATE_STRINGS,
} from '../consts/rants';
import STATE from '../consts/state';
import {
  ADD_TOAST,
} from '../consts/toast';


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
      })
      .catch((err) => {
        dispatch({ type: FETCH_RANTS, state: STATE.FAILED, payload: err, feedType: type });
        dispatch({
          type: ADD_TOAST,
          toast: {
            text: STATE_STRINGS.FAILED_GET_RANTS,
            timeout: 40000,
          },
        });
      });
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
