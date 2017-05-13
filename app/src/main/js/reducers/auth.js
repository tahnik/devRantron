import DEFAULT_STATES from '../consts/default_states';
import { AUTH, STATE } from '../consts/action_types';

export default (state = DEFAULT_STATES.AUTH, action) => {
  switch (action.type) {
    case AUTH.LOGIN: {
      switch (action.state) {
        case STATE.SUCCESS:
          return { ...state, user: action.user, state: 'STATE_SUCCESS' };
        case STATE.FAILED:
          return { ...state, user: null, state: 'STATE_FAILED' };
        case STATE.LOADING:
          return { ...state, user: null, state: 'STATE_LOADING' };
        default:
          return state;
      }
    }
    default:
      return state;
  }
};
