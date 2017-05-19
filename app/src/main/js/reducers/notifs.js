import DEFAULT_STATES from '../consts/default_states';
import { NOTIFS, STATE } from '../consts/types';

export default (state = DEFAULT_STATES.NOTIFS, action) => {
  switch (action.type) {
    case NOTIFS.FETCH:
      switch (action.state) {
        case STATE.SUCCESS:
          return { ...state, notifs: action.notifs, state: STATE.SUCCESS };
        case STATE.FAILED:
          return { ...state, state: STATE.FAILED };
        case STATE.LOADING:
          return { ...state, state: STATE.LOADING };
        default:
          return state;
      }
    default:
      return state;
  }
};
