import DEFAULT_STATES from '../consts/default_states';
import { AUTH, STATE } from '../consts/types';

export default (state = DEFAULT_STATES.auth, action) => {
  switch (action.type) {
    case AUTH.LOGIN: {
      switch (action.state) {
        case STATE.SUCCESS: {
          return {
            ...state,
            user: action.user,
            state: STATE.SUCCESS,
          };
        }
        case STATE.FAILED:
          return { ...state, user: null, state: STATE.FAILED };
        case STATE.LOADING:
          return { ...state, user: null, state: STATE.LOADING };
        default:
          return state;
      }
    }
    case AUTH.NOLOGIN: {
      return {
        ...state,
        noLogin: action.payload,
      };
    }
    case AUTH.LOGOUT: {
      const nextState = {
        ...state,
        user: null,
        state: STATE.INITIAL,
      };
      return nextState;
    }
    default:
      return state;
  }
};
