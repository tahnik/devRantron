import rantscript from '../consts/rantscript';
import { FEED, STATE } from '../consts/types';
import showToast from './toast';
import { getUID } from '../consts/DOMFunctions';

const AMOUNT = 25;

const fetchRants = (sort, id) => (dispatch, getState) => {
  const columns = getState().columns;
  const currentColumn = columns.filter(column => column.id === id)[0];
  const index = columns.indexOf(currentColumn);

  const { user } = getState().auth;
  let uid = getUID();
  let page = 0;
  let oldSort = '';
  let prevSet = 0;

  let authToken = null;
  if (user) {
    authToken = user.authToken;
  }

  if (currentColumn) {
    uid = currentColumn.id;
    prevSet = currentColumn.prev_set;
    oldSort = currentColumn.sort;
    page = oldSort !== sort ? 0 : currentColumn.page;
  }

  const newColumns = getState().columns.slice();

  if (page === 0) {
    const loadingColumn = getState().columns.slice();
    loadingColumn[index].items = [];
    dispatch({
      type: FEED.ACTION.FETCH,
      state: STATE.SUCCESS,
      columns: loadingColumn,
    });
  }

  rantscript
      .rants(sort, AMOUNT, AMOUNT * page, prevSet, authToken)
      .then((res) => {
        newColumns[index] = {
          id: uid,
          type: FEED.RANTS.NAME,
          items: [...currentColumn.items, ...res.rants],
          page: currentColumn.page + 1,
          sort,
          prev_set: res.set,
        };
        dispatch({
          type: FEED.ACTION.FETCH,
          state: STATE.SUCCESS,
          columns: newColumns,
        });
      })
      .catch(() => {
        showToast(dispatch, 'Username or Password is wrong');
      });
};

const fetchCollabs = (sort, page, authToken) => (dispatch) => {
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

const fetch = (sort, type, id, range = null) => (dispatch, getState) => {
  switch (type) {
    case FEED.RANTS.NAME:
      dispatch(fetchRants(sort, id, range));
      break;
    case FEED.STORIES.NAME:
      dispatch(fetchStories(sort, range));
      break;
    case FEED.COLLABS.NAME:
      dispatch(fetchCollabs(sort));
      break;
    default:
      dispatch(fetchRants());
  }
};


export { fetch as default };
