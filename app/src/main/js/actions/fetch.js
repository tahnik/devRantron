import { rantscriptBrowser } from '../consts/rantscript';
import { FEED, STATE } from '../consts/types';
import showToast from './toast';

const AMOUNT = 25;

const fetchRants = sort => (dispatch, getState) => {
  const { user } = getState().auth;
  dispatch({
    type: FEED.RANTS.ACTION.FETCH,
    state: STATE.LOADING,
  });
  let authToken = null;
  if (user) {
    authToken = user.authToken;
  }
  rantscriptBrowser
      .rants(sort, AMOUNT, 0, authToken)
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

const fetch = (sort, type) => {
  switch (type) {
    case FEED.RANTS.NAME:
      return fetchRants(sort);
    default:
      return fetchRants();
  }
};


export { fetch as default };
