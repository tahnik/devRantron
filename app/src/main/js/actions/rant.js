import rantscript from 'rantscript';
import {
  FETCH_RANT,
  CLOSE_RANT,
} from '../consts/rants';
import { STATE } from '../consts/state';

export function fetchRant(id) {
  return (dispatch) => {
    dispatch({
      type: FETCH_RANT,
      state: STATE.LOADING,
    });
    rantscript
      .rant(id)
      .then((res) => {
        dispatch({
          type: FETCH_RANT,
          state: STATE.SUCCESS,
          payload: res,
        });
      })
      .catch((err) => {
        // dispatch({ type: FETCH_RANTS, state: STATE.FAILED, payload: err, feedType: type });
      });
  };
}

export function closeRant() {
  return (dispatch) => {
    dispatch({
      type: CLOSE_RANT,
    });
  };
}
