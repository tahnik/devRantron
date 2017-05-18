import DEFAULT_STATES from '../consts/default_states';
import { FEED, STATE } from '../consts/types';

export default (state = DEFAULT_STATES.STORIES, action) => {
  switch (action.type) {
    case FEED.STORIES.ACTION.FETCH:
      switch (action.state) {
        case STATE.SUCCESS: {
          return {
            ...state,
            type: FEED.STORIES.NAME,
            state: STATE.SUCCESS,
            items: [
              ...state.items,
              ...action.items,
            ],
            page: action.page + 1,
            sort: action.sort,
            range: action.range,
          };
        }
        case STATE.FAILED:
          return {
            ...state,
            type: FEED.STORIES.NAME,
            state: STATE.FAILED,
          };
        case STATE.LOADING:
          return {
            ...state,
            type: FEED.STORIES.NAME,
            state: STATE.LOADING,
            items: action.page !== 0 ? state.items : [],
            page: action.page !== 0 ? state.page : 0,
          };
        case STATE.INITIAL:
          return {
            ...state,
            type: FEED.STORIES.NAME,
            state: STATE.INITIAL,
          };
        default:
          return state;
      }
    case FEED.STORIES.ACTION.RESET:
      return DEFAULT_STATES.STORIES;
    default:
      return state;
  }
};
