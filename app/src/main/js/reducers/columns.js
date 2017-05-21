import DEFAULT_STATES from '../consts/default_states';
import { FEED, STATE } from '../consts/types';

export default (state = DEFAULT_STATES.COLUMNS, action) => {
  switch (action.type) {
    case FEED.ACTION.FETCH:
      switch (action.state) {
        case STATE.SUCCESS: {
          return action.columns;
        }
        case STATE.FAILED:
          return action.columns;
        case STATE.INITIAL:
          return action.columns;
        default:
          return state;
      }
    case FEED.ACTION.RESET:
      return DEFAULT_STATES.COLUMNS;
    default:
      return state;
  }
};
