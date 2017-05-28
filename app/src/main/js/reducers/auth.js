import DEFAULT_STATES from '../consts/default_states';
import { AUTH, STATE } from '../consts/types';

export default (state = DEFAULT_STATES.AUTH, action) => {
  switch (action.type) {
    case AUTH.LOGIN: {
      switch (action.state) {
        case STATE.SUCCESS: {
          const nextState = {
            ...state,
            user: action.user,
            state: STATE.SUCCESS,
          };
          localStorage.setItem('auth', JSON.stringify(nextState));
          return nextState;
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
      const nextState = {
        ...state,
        noLogin: action.payload,
      };
      localStorage.setItem('auth', JSON.stringify(nextState));
      return nextState;
    }
    case AUTH.LOGOUT: {
      const nextState = {
        ...state,
        user: null,
        state: STATE.INITIAL,
      };
      localStorage.setItem('auth', JSON.stringify(nextState));
      return nextState;
    }
    default:
      return state;
  }
};
