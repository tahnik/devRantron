import rantscript from '../consts/rantscript';
import { FEED, STATE } from '../consts/types';
import showToast from './toast';

const AMOUNT = 25;

const fetchRants = sort => (dispatch, getState) => {
  const { user } = getState().auth;
  let page = 0;
  let oldSort = '';
  if (getState().rants) {
    oldSort = getState().rants.sort;
    page = oldSort !== sort ? 0 : getState().rants.page;
  }
  dispatch({
    type: FEED.RANTS.ACTION.FETCH,
    state: STATE.LOADING,
    page,
  });
  let authToken = null;
  if (user) {
    authToken = user.authToken;
  }
  rantscript
      .rants(sort, AMOUNT, AMOUNT * page, authToken)
      .then((res) => {
        dispatch({
          type: FEED.RANTS.ACTION.FETCH,
          state: STATE.SUCCESS,
          items: res,
          page,
          sort,
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

const fetchStories = (sort, range) => (dispatch, getState) => {
  const { user } = getState().auth;
  let page = 0;
  let oldSort = '';
  let oldRange = '';
  if (getState().stories) {
    oldSort = getState().stories.sort;
    oldRange = getState().stories.range;
    page = oldSort !== sort || oldRange !== range ? 0 : getState().stories.page;
  }
  dispatch({
    type: FEED.STORIES.ACTION.FETCH,
    state: STATE.LOADING,
    page,
  });
  let authToken = null;
  if (user) {
    authToken = user.authToken;
  }
  rantscript
      .stories(range, sort, AMOUNT, AMOUNT * page, authToken)
      .then((res) => {
        dispatch({
          type: FEED.STORIES.ACTION.FETCH,
          state: STATE.SUCCESS,
          items: res,
          page,
          sort,
          range,
        });
      })
      .catch(() => {
        showToast(dispatch, 'Username or Password is wrong');
        dispatch({
          type: FEED.STORIES.ACTION.FETCH,
          state: STATE.FAILED,
        });
      });
};

const fetch = (sort, type, range = null) => {
  switch (type) {
    case FEED.RANTS.NAME:
      return fetchRants(sort);
    case FEED.STORIES.NAME:
      return fetchStories(sort, range);
    default:
      return fetchRants();
  }
};


export { fetch as default };
