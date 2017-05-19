import DEFAULT_STATES from '../consts/default_states';
import { NOTIF, STATE } from '../consts/types';

export default (state = DEFAULT_STATES.NOTIF, action) => {
  switch (action.type) {
    case NOTIF.FETCH:
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
