import DEFAULT_STATES from '../consts/default_states';
import { FEED, STATE } from '../consts/types';

export default (state = DEFAULT_STATES.RANTS, action) => {
  switch (action.type) {
    case FEED.RANTS.ACTION.FETCH:
      switch (action.state) {
        case STATE.SUCCESS:
          return {
            ...state,
            type: FEED.RANTS.NAME,
            state: STATE.SUCCESS,
            items: action.items,
          };
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
    default:
      return state;
  }
};
