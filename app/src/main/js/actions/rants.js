import rantscript from 'rantscript';
import { FETCH_RANTS } from '../consts/rants';
import { STATE } from '../consts/state';

export function fetchRants(type, amount, page) {
  return (dispatch) => {
    dispatch({
      type: FETCH_RANTS,
      state: STATE.LOADING,
    });
    rantscript
      .rants(type, amount, page)
      .then((res) => {
        dispatch({
          type: FETCH_RANTS,
          state: STATE.SUCCESS,
          payload: res,
        });
      })
      .catch((err) => {
        dispatch({ type: FETCH_RANTS, state: STATE.FAILED, payload: err });
      });
  };
}
