import AUTH from '../consts/auth';
import STATE from '../consts/state';

const DEFAULT_STATE = {
  authToken: null,
  key: null,
  id: null,
  expire_time: null,
  user_id: null,
  state: STATE.CANCELLED,
};

export default function Auth(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case AUTH.LOGIN:
      switch (action.state) {
        case STATE.SUCCESS: // eslint-disable-line
          const persisAuth = {
            authToken: action.authToken,
            key: action.key,
            id: action.id,
            expire_time: action.expire_time,
            user_id: action.user_id,
            state: action.state,
          };
          // console.log(persisAuth);
          return persisAuth;
        case STATE.FAILED:
          return { key: null, state: action.state };
        case STATE.CANCELLED:
          return { key: null, state: action.state };
        default:
          return { key: null };
      }
    case AUTH.LOGOUT:
      return { key: null, state: STATE.CANCELLED };
    default:
      return state;
  }
}
