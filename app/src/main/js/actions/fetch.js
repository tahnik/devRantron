import rantscript from '../consts/rantscript';
import { FEED, STATE, COLUMN, COLUMNS, ITEM } from '../consts/types';
import DEFAULT_STATES from '../consts/default_states';
import showToast from './toast';
import { getUID } from '../consts/DOMFunctions';

const AMOUNT = 20;

/**
 * devRant server sometimes returns duplicate for algo sorts. Duplicates
 * can happen for many other reasons as well. This function filters them.
 *
 * @param {array} orants Existing rants in a column
 * @param {array} newRants New rants fetched from devRant
 * @returns {array} filteredRants Filtered rants without duplicates
 */
const filterDuplicate = (orants, newRants) => {
  const ids = [];
  orants.map(rs => ids.push(rs.id));
  return newRants.filter(rant => ids.indexOf(rant.id) === -1);
};


/**
 * Returns the filters according to feed type
 *
 * @param {string} type Type of the feed
 * @returns {object} filters Filters associated with the filter
 */
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

/**
 * Only for collab this is necessary. The card that shows column is reusable
 * so it needs a flag to understand which contents to show
 *
 * @param {string} type Type of the feed
 * @returns {string} itemType Type of item the feed contains
 */
const getItemType = type => (type === FEED.COLLABS.NAME ? ITEM.COLLAB.NAME : ITEM.RANT.NAME);

/**
 * Adds a column in the custom component.
 *
 * @param {string} [type=FEED.RANTS.NAME] type of the feed that will be added
 */
const addColumn = (type = FEED.RANTS.NAME) => (dispatch) => {
  // get the default state of a column
  const column = DEFAULT_STATES.COLUMN;

  // Modify the column attributes as necessary
  const filters = getFilters(type);
  column.id = getUID();
  column.filters = filters;
  column.type = type;
  column.itemType = getItemType(type);

  dispatch({
    type: COLUMNS.ADD,
    column,
  });
};

/**
 * Removes a column in the custom component.
 *
 * @param {number} id ID of the column that will be removed
 */
const removeColumn = id => (dispatch) => {
  dispatch({
    type: COLUMNS.REMOVE,
    id,
  });
};

/**
 * Used to reset a column when switching between tabs or nav
 *
 */
const resetColumn = () => (dispatch) => {
  // Get a default state, this can be used to reset the column
  const column = DEFAULT_STATES.COLUMN;
  column.id = getUID();

  dispatch({
    type: COLUMN.RESET,
    column,
  });
};

/**
 * fetches a feed.
 *
 * Why not have separate functions for them? Obviously reusablity. All the feeds
 * share a lot of similar codes.
 *
 * Why not separate function instead of switch cases? Eventually I realised I
 * was passing too many parameters. So switch case is actually less verbose here
 *
 * @param {string} sort Either algo, recent or top
 * @param {string} type The type of feed (rants, collabs)
 * @param {string} id ID of the specific column, used to identify a column in
 *                    array of columns
 * @param {string} range Either Day, Month, Year or All
 * @param {bool} refresh Indicates if the column should be refreshed from the
 *                       start
 */
const fetch =
(sort, type, id, range, refresh = false) => (dispatch, getState) => {
  // First check if column that requested the fetch is part of custom columns
  const columns = getState().columns;
  let currentColumn = columns.filter(column => column.id === id)[0];

  // If it isn't, then fetch was requested from single column feeds.
  if (!currentColumn) {
    if (getState().column.id === id) {
      currentColumn = getState().column;
    }
  }

  // Add this point we have the column that requested the fetch.

  /**
   * Check if there is an authenticated user, then get the auth token
   * which will be used while fetching the feed.
   * Using the token with the fetch returns which rants where upvoted or not
   */
  const { user } = getState().auth;
  let authToken = null;
  if (user) {
    authToken = user.authToken;
  }


  // Get the filters and item type associated with the feed
  const filters = getFilters(type);
  const itemType = getItemType(type);

  /**
   * Get the currently selected sort and range and compare them with new ones
   * If they have changed, make the page 0. This means we are doing a semi reset
   * Also, resets the pages if fetch requested a refresh
   */
  let page = 0;
  let prevSet = 0;
  prevSet = currentColumn.prev_set;
  const oldSort = currentColumn.sort;
  const oldRange = currentColumn.range;
  page = oldSort !== sort
         || oldRange !== range
         || refresh ? 0 : currentColumn.page;

  /**
   * If the pages is 0, that means we need to remove the existing items in the
   * column.
   * If not, just update the state to loading, that will be used by column
   * to make sure it is not requesting any fetch while there is a pending
   * request.
   */
  if (page === 0) {
    dispatch({
      type: COLUMN.FETCH,
      column: { ...currentColumn, items: [], page: 0, state: STATE.LOADING },
    });
  } else {
    dispatch({
      type: COLUMN.FETCH,
      column: { ...currentColumn, state: STATE.LOADING },
    });
  }

  // Setup the new column. Reusability
  const newColumn = {
    id: currentColumn.id,
    sort,
    range,
    type,
    page: currentColumn.page + 1,
    state: STATE.SUCCESS,
    filters,
    itemType,
  };

  // Switch between different feed types and fetches the right one.
  switch (type) {
    case FEED.RANTS.NAME:
      rantscript
      .rants(sort, AMOUNT, AMOUNT * page, prevSet, authToken)
      .then((res) => {
        /**
         * If the pages is 0, that means we do not need to current items in the
         * column.
         */
        const currentItems = page !== 0 ? currentColumn.items : [];
        newColumn.items = [
          ...currentItems,
          ...filterDuplicate(currentItems, res.rants),
        ];
        // The prev_set is needed for algo sort to work.
        newColumn.prev_set = res.set;
        dispatch({
          type: COLUMN.FETCH,
          column: newColumn,
        });
      })
      .catch(() => {
        dispatch(showToast('Could not fetch feed'));
      });
      break;
    case FEED.STORIES.NAME:
      rantscript
      .stories(range, sort, AMOUNT, AMOUNT * page, authToken)
      .then((res) => {
        const currentItems = page !== 0 ? currentColumn.items : [];
        newColumn.items = [
          ...currentItems,
          ...filterDuplicate(currentItems, res),
        ];
        newColumn.prev_set = res.set;
        dispatch({
          type: COLUMN.FETCH,
          column: newColumn,
        });
      })
      .catch(() => {
        dispatch(showToast('Could not fetch feed'));
      });

      break;
    case FEED.COLLABS.NAME:
      rantscript
      .collabs(sort, AMOUNT, AMOUNT * page, authToken)
      .then((res) => {
        const currentItems = page !== 0 ? currentColumn.items : [];
        newColumn.items = [
          ...currentItems,
          ...filterDuplicate(currentItems, res),
        ];
        newColumn.prev_set = res.set;
        dispatch({
          type: COLUMN.FETCH,
          column: newColumn,
        });
      })
      .catch(() => {
        dispatch(showToast('Could not fetch feed'));
      });
      break;
    default:
      dispatch();
  }
};


export { fetch as default, addColumn, resetColumn, removeColumn };
