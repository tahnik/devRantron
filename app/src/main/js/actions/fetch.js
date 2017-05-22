import rantscript from '../consts/rantscript';
import { FEED, STATE } from '../consts/types';
import showToast from './toast';
import { getUID } from '../consts/DOMFunctions';

const AMOUNT = 20;

const fetch = (sort, type, id, range = null) => (dispatch, getState) => {
  const columns = getState().columns;
  const currentColumn = columns.filter(column => column.id === id)[0];
  const index = columns.indexOf(currentColumn);

  const { user } = getState().auth;
  let uid = getUID();
  let page = 0;
  let oldSort = '';
  let prevSet = 0;
  let oldRange = '';

  let authToken = null;
  if (user) {
    authToken = user.authToken;
  }

  if (currentColumn) {
    uid = currentColumn.id;
    prevSet = currentColumn.prev_set;
    oldSort = currentColumn.sort;
    oldRange = currentColumn.range;
    console.log(oldRange !== range);
    page = oldSort !== sort || oldRange !== range ? 0 : currentColumn.page;
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
  switch (type) {
    case FEED.RANTS.NAME:
      rantscript
      .rants(sort, AMOUNT, AMOUNT * page, prevSet, authToken)
      .then((res) => {
        newColumns[index] = {
          id: uid,
          type: FEED.RANTS.NAME,
          items: [...currentColumn.items, ...res.rants],
          page: currentColumn.page + 1,
          sort,
          range,
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
      break;
    case FEED.STORIES.NAME:
      rantscript
      .stories(range, sort, AMOUNT, AMOUNT * page, authToken)
      .then((res) => {
        newColumns[index] = {
          id: uid,
          type: FEED.RANTS.NAME,
          items: [...currentColumn.items, ...res],
          page: currentColumn.page + 1,
          sort,
          range,
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

      break;
    case FEED.COLLABS.NAME:
      rantscript
      .collabs(sort, AMOUNT, AMOUNT * page, authToken)
      .then((res) => {
        newColumns[index] = {
          id: uid,
          type: FEED.COLLABS.NAME,
          items: [...currentColumn.items, ...res],
          page: currentColumn.page + 1,
          sort,
          range,
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
        dispatch({
          type: FEED.ACTION.FETCH,
          itemType: FEED.COLLABS.NAME,
          state: STATE.FAILED,
        });
      });
      break;
    default:
      dispatch();
  }
};


export { fetch as default };
