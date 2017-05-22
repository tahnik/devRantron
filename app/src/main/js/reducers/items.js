import DEFAULT_STATES from '../consts/default_states';
import { FEED, STATE } from '../consts/types';

// Thanks to @tkshnwesper
function filterDuplicate(orants, newRants) {
  const ids = [];
  orants.map(rs => ids.push(rs.id));
  return newRants.filter(rant => ids.indexOf(rant.id) === -1);
}

export default (state = DEFAULT_STATES.ITEMS, action) => {
  switch (action.type) {
    case FEED.ACTION.FETCH:
      switch (action.state) {
        case STATE.SUCCESS: {
          return {
            ...state,
            type: action.itemType,
            state: STATE.SUCCESS,
            items: [
              ...state.items,
              ...filterDuplicate(state.items, action.items),
            ],
            page: action.page + 1,
            sort: action.sort,
            range: action.range,
          };
        }
        case STATE.FAILED:
          return {
            ...state,
            type: action.itemType,
            state: STATE.FAILED,
          };
        case STATE.INITIAL:
          return {
            ...state,
            type: action.itemType,
            state: STATE.INITIAL,
          };
        default:
          return state;
      }
    case FEED.ACTION.RESET:
      return DEFAULT_STATES.ITEMS;
    default:
      return state;
  }
};
