import AUTH from '../consts/auth';
import STATE from '../consts/state';

const DEFAULT_STATE = {
  token: null,
  state: STATE.CANCELLED,
};

export default function Auth(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case AUTH.LOGIN:
      switch (action.state) {
        case STATE.SUCCESS: // eslint-disable-line
          const persisAuth = {
            token: action.payload.key,
            state: action.state,
          };
          localStorage.setItem('auth', JSON.stringify(persisAuth));
          return { token: action.payload.key, state: action.state };
        case STATE.FAILED:
          return { token: null, state: action.state };
        case STATE.CANCELLED:
          return { token: null, state: action.state };
        default:
          return { token: null };
      }
    case AUTH.LOGOUT:
      return { token: null, state: STATE.CANCELLED };
    default:
      return state;
  }
}
