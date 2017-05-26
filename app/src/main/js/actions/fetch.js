import rantscript from '../consts/rantscript';
import { FEED, STATE, COLUMN, COLUMNS } from '../consts/types';
import DEFAULT_STATES from '../consts/default_states';
import showToast from './toast';
import { getUID } from '../consts/DOMFunctions';

const AMOUNT = 20;
let loading = false;

// Thanks to @tkshnwesper
const filterDuplicate = (orants, newRants) => {
  const ids = [];
  orants.map(rs => ids.push(rs.id));
  return newRants.filter(rant => ids.indexOf(rant.id) === -1);
};

const getFilters = (type) => {
  switch (type) {
    case FEED.RANTS.NAME:
      return FEED.RANTS.FILTERS;
    case FEED.COLLABS.NAME:
      return FEED.COLLABS.FILTERS;
    case FEED.STORIES.NAME:
      return FEED.STORIES.FILTERS;
    default:
      return FEED.RANTS.FILTERS;
  }
};

const addColumn = (type = FEED.RANTS.NAME) => (dispatch) => {
  const column = DEFAULT_STATES.COLUMN;
  const filters = getFilters(type);
  column.id = getUID();
  column.filters = filters;
  column.type = type;
  dispatch({
    type: COLUMNS.ADD,
    state: STATE.SUCCESS,
    column,
  });
};

const resetColumns = () => (dispatch) => {
  const column = DEFAULT_STATES.COLUMN;
  column.id = getUID();
  column.type = '';
  dispatch({
    type: COLUMN.RESET,
    state: STATE.SUCCESS,
    column,
  });
};

const fetch = (sort, type, id, range = null) => (dispatch, getState) => {
  if (loading) {
    return;
  }
  const columns = getState().columns;
  let currentColumn = columns.filter(column => column.id === id)[0];

  if (!currentColumn) {
    if (getState().column.id === id) {
      currentColumn = Object.assign({}, getState().column);
    }
  }

  const { user } = getState().auth;
  let uid = getUID();
  let page = 0;
  let oldSort = '';
  let prevSet = 0;
  let oldRange = '';
  const filters = getFilters(type);

  let authToken = null;
  if (user) {
    authToken = user.authToken;
  }

  uid = currentColumn.id;
  prevSet = currentColumn.prev_set;
  oldSort = currentColumn.sort;
  oldRange = currentColumn.range;
  page = oldSort !== sort || oldRange !== range ? 0 : currentColumn.page;

  if (page === 0) {
    currentColumn.items = [];
    currentColumn.page = 0;
    dispatch({
      type: COLUMN.FETCH,
      state: STATE.LOADING,
      column: currentColumn,
    });
  }
  loading = true;
  switch (type) {
    case FEED.RANTS.NAME:
      rantscript
      .rants(sort, AMOUNT, AMOUNT * page, prevSet, authToken)
      .then((res) => {
        loading = false;
        const column = {
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
          filters,
        };
        dispatch({
          type: COLUMN.FETCH,
          state: STATE.SUCCESS,
          column,
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
        loading = false;
        const column = {
          id: uid,
          type: FEED.STORIES.NAME,
          items: [
            ...currentColumn.items,
            ...filterDuplicate(currentColumn.items, res),
          ],
          page: currentColumn.page + 1,
          sort,
          range,
          prev_set: res.set,
          filters,
        };
        dispatch({
          type: COLUMN.FETCH,
          state: STATE.SUCCESS,
          column,
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
        loading = false;
        const column = {
          id: uid,
          type: FEED.COLLABS.NAME,
          items: [
            ...currentColumn.items,
            ...filterDuplicate(currentColumn.items, res),
          ],
          page: currentColumn.page + 1,
          sort,
          range,
          prev_set: res.set,
          filters,
        };
        dispatch({
          type: COLUMN.FETCH,
          state: STATE.SUCCESS,
          column,
        });
      })
      .catch(() => {
        showToast(dispatch, 'Username or Password is wrong');
      });
      break;
    default:
      dispatch();
  }
};


export { fetch as default, addColumn, resetColumns };
