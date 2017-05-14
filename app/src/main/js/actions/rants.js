import rantscript from '../consts/rantscript';
import { FEED, STATE } from '../consts/types';
import showToast from './toast';

const AMOUNT = 25;

const fetchRants = () => (dispatch, getState) => {
  const { user } = getState().auth;
  dispatch({
    type: FEED.RANTS.ACTION.FETCH,
    state: STATE.LOADING,
  });
  let authToken = null;
  if (user) {
    authToken = user.authToken;
  }
  rantscript
      .rants('algo', AMOUNT, 0, authToken)
      .then((res) => {
        dispatch({
          type: FEED.RANTS.ACTION.FETCH,
          state: STATE.SUCCESS,
          items: res,
        });
      })
      .catch(() => {
        showToast(dispatch, 'Username or Password is wrong');
        dispatch({
          type: FEED.RANTS.ACTION.FETCH,
          state: STATE.FAILED,
        });
      });
};

export { fetchRants };
