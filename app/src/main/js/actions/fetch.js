import rantscript from '../consts/rantscript';
import { FEED, STATE, ITEM } from '../consts/types';
import showToast from './toast';

const AMOUNT = 25;

const fetchRant = id => (dispatch) => {
  dispatch({
    type: ITEM.RANT.ACTION.FETCH,
    state: STATE.LOADING,
    id,
  });
  rantscript
  .rant(id)
  .then((res) => {
    dispatch({
      type: ITEM.RANT.ACTION.FETCH,
      itemType: ITEM.RANT.NAME,
      state: STATE.SUCCESS,
      id,
      item: res,
    });
  })
  .catch(() => {
    showToast(dispatch, 'Could not get rant');
    dispatch({
      type: ITEM.RANT.ACTION.FETCH,
      state: STATE.FAILED,
    });
  });
};

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

const fetch = (type, id) => {
  switch (type) {
    case FEED.RANTS.NAME:
      return fetchRants();
    case ITEM.RANT.NAME:
      return fetchRant(id);
    default:
      return fetchRants();
  }
};


export { fetch as default };
