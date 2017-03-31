import rantscript from 'rantscript';
import { FETCH_RANTS } from '../consts/rants';
import { STATE } from '../consts/state';

export function fetch(type, amount, page = 0) {
  return (dispatch) => {
    console.log(page)
    dispatch({
      type: FETCH_RANTS,
      state: STATE.LOADING,
      feedType: type,
    });
    rantscript
      .rants(type, amount, amount*page)
      .then((res) => {
        dispatch({
          type: FETCH_RANTS,
          state: STATE.SUCCESS,
          payload: res,
          feedType: type,
        });
      })
      .catch((err) => {
        //dispatch({ type: FETCH_RANTS, state: STATE.FAILED, payload: err, feedType: type });
      });
  };
}
