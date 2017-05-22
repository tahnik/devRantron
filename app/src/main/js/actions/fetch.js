import rantscript from '../consts/rantscript';
import { FEED, STATE } from '../consts/types';
import DEFAULT_STATES from '../consts/default_states';
import showToast from './toast';
import { getUID } from '../consts/DOMFunctions';

const AMOUNT = 20;

// Thanks to @tkshnwesper
const filterDuplicate = (orants, newRants) => {
  const ids = [];
  orants.map(rs => ids.push(rs.id));
  return newRants.filter(rant => ids.indexOf(rant.id) === -1);
};

const addColumn = (type) => (dispatch, getState) => {
  const columns = getState().columns.slice();
  const newColumn = DEFAULT_STATES.COLUMNS[0];
  newColumn.id = getUID();
  columns.push(newColumn);
  dispatch({
    type: FEED.ACTION.FETCH,
    state: STATE.SUCCESS,
    columns,
  });
};

const resetColumns = () => (dispatch) => {
  console.log("resetting the columns");
  const newColumns = DEFAULT_STATES.COLUMNS;
  newColumns[0].id = getUID();
  console.log(newColumns);
  dispatch({
    type: FEED.ACTION.FETCH,
    state: STATE.SUCCESS,
    columns: newColumns,
  });
};

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
    page = oldSort !== sort || oldRange !== range ? 0 : currentColumn.page;
  }

  const newColumns = getState().columns.slice();

  if (page === 0) {
    const loadingColumn = getState().columns.slice();
    loadingColumn[index].items = [];
    loadingColumn[index].page = 0;
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
          items: [
            ...currentColumn.items,
            ...filterDuplicate(currentColumn.items, res.rants),
          ],
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


export { fetch as default, addColumn, resetColumns };
