import rantscript from '../consts/rantscript';
import { FEED, STATE } from '../consts/types';
import showToast from './toast';

const AMOUNT = 25;

const fetchRants = (sort, page, range, authToken) => (dispatch) => {
  rantscript
      .rants(sort, AMOUNT, AMOUNT * page, 0, authToken)
      .then((res) => {
        dispatch({
          type: FEED.ACTION.FETCH,
          state: STATE.SUCCESS,
          itemType: FEED.RANTS.NAME,
          items: res.rants,
          page,
          sort,
          range,
        });
      })
      .catch((err) => {
        console.log(err)
        showToast(dispatch, 'Username or Password is wrong');
        dispatch({
          type: FEED.ACTION.FETCH,
          itemType: FEED.RANTS.NAME,
          state: STATE.FAILED,
        });
      });
};

const fetchCollabs = (sort, page, range, authToken) => (dispatch) => {
  rantscript
      .collabs(sort, AMOUNT, AMOUNT * page, authToken)
      .then((res) => {
        dispatch({
          type: FEED.ACTION.FETCH,
          state: STATE.SUCCESS,
          itemType: FEED.COLLABS.NAME,
          items: res,
          page,
          sort,
          range,
        });
      })
      .catch(() => {
        showToast(dispatch, 'Username or Password is wrong');
        dispatch({
          type: FEED.ACTION.FETCH,
          itemType: FEED.COLLABS.NAME,
          state: STATE.FAILED,
        });
      });
};

const fetchStories = (sort, range, page, authToken) => (dispatch) => {
  rantscript
      .stories(range, sort, AMOUNT, AMOUNT * page, authToken)
      .then((res) => {
        dispatch({
          type: FEED.ACTION.FETCH,
          state: STATE.SUCCESS,
          itemType: FEED.STORIES.NAME,
          items: res,
          page,
          sort,
          range,
        });
      })
      .catch(() => {
        showToast(dispatch, 'Username or Password is wrong');
        dispatch({
          type: FEED.ACTION.FETCH,
          itemType: FEED.STORIES.NAME,
          state: STATE.FAILED,
        });
      });
};

const fetch = (sort, type, range = null) => (dispatch, getState) => {
  const { user } = getState().auth;
  let page = 0;
  let oldSort = '';
  let oldRange = '';
  if (getState().items) {
    oldSort = getState().items.sort;
    oldRange = getState().items.range;
    page = oldSort !== sort || oldRange !== range ? 0 : getState().items.page;
  }
  if (page === 0) {
    dispatch({
      type: FEED.ACTION.RESET,
    });
  }
  let authToken = null;
  if (user) {
    authToken = user.authToken;
  }
  switch (type) {
    case FEED.RANTS.NAME:
      dispatch(fetchRants(sort, page, range, authToken));
      break;
    case FEED.STORIES.NAME:
      dispatch(fetchStories(sort, range, page, authToken));
      break;
    case FEED.COLLABS.NAME:
      dispatch(fetchCollabs(sort, page, range, authToken));
      break;
    default:
      dispatch(fetchRants());
  }
};


export { fetch as default };
