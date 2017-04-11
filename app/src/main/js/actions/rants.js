import rantscript from 'rantscript';
import {
  FETCH_RANTS,
  RESET_PAGE,
} from '../consts/rants';
import STATE from '../consts/state';

// change to disable comprssion in production
rantscript.httpSettings.SET_COMPRESS(false);
// only execute if we are in development
if (process.env.NODE_ENV === 'development') {
  rantscript.httpSettings.SET_DEBUG(true);
}

export function fetch(type, amount, page = 0) {
  return (dispatch) => {
    dispatch({
      type: FETCH_RANTS,
      state: STATE.LOADING,
      feedType: type,
    });
    rantscript
      .rants(type, amount, page)
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
