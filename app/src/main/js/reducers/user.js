import DEFAULT_STATES from '../consts/default_states';
import { USER, STATE } from '../consts/types';

export default (state = DEFAULT_STATES.USER, action) => {
  switch (action.type) {
    case USER.FETCH:
      switch (action.state) {
        case STATE.SUCCESS: {
          const nextState = {
            ...state, profile: action.profile, state: STATE.SUCCESS,
          };
          localStorage.setItem('user', JSON.stringify(nextState));
          return nextState;
        }
        case STATE.FAILED:
          return { ...state, state: STATE.FAILED };
        case STATE.LOADING:
          return { ...state, state: STATE.LOADING };
        default:
          return state;
      }
    case USER.REMOVE: {
      const nextState = {
        profile: null, state: STATE.INITIAL,
      };
      localStorage.setItem('user', JSON.stringify(nextState));
      return nextState;
    }
    default:
      return state;
  }
};
