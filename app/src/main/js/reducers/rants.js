import DEFAULT_STATES from '../consts/default_states';
import { FEED, STATE } from '../consts/types';

export default (state = DEFAULT_STATES.RANTS, action) => {
  switch (action.type) {
    case FEED.RANTS.ACTION.FETCH:
      switch (action.state) {
        case STATE.SUCCESS: {
          return {
            ...state,
            type: FEED.RANTS.NAME,
            state: STATE.SUCCESS,
            items: [
              ...state.items,
              ...action.items,
            ],
            page: action.page + 1,
            sort: action.sort,
          };
        }
        case STATE.FAILED:
          return {
            ...state,
            type: FEED.RANTS.NAME,
            state: STATE.FAILED,
          };
        case STATE.LOADING:
          return {
            ...state,
            type: FEED.RANTS.NAME,
            state: STATE.LOADING,
            items: action.page !== 0 ? state.items : [],
            page: action.page !== 0 ? state.page : 0,
          };
        case STATE.INITIAL:
          return {
            ...state,
            type: FEED.RANTS.NAME,
            state: STATE.INITIAL,
          };
        default:
          return state;
      }
    case FEED.RANTS.ACTION.RESET:
      return DEFAULT_STATES.RANTS;
    default:
      return state;
  }
};
