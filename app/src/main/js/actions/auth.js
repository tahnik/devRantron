import electron from 'electron';
import AUTH, { STATE_STRINGS } from '../consts/auth';
import STATE from '../consts/state';
import {
  ADD_TOAST,
  REMOVE_TOAST,
} from '../consts/toast';

const rantscript = electron.remote.require('rantscript');

// change to disable comprssion in production
rantscript.httpSettings.SET_COMPRESS(false);
// only execute if we are in development
if (process.env.NODE_ENV === 'development') {
  rantscript.httpSettings.SET_DEBUG(true);
}

export function login(username, password) {
  return (dispatch) => {
    dispatch({
      type: AUTH.LOGIN,
      state: STATE.LOADING,
    });
    rantscript
      .login(username, password)
      .then((res) => {
        const persisAuth = {
          type: AUTH.LOGIN,
          state: STATE.SUCCESS,
          authToken: res.auth_token,
          token: res.auth_token.key,
          id: res.auth_token.id,
          expire_time: res.auth_token.expire_time,
          user_id: res.auth_token.user_id,
        };
        dispatch(persisAuth);
        const auth = Object.assign({}, persisAuth);
        delete auth.type;
        localStorage.setItem('auth', JSON.stringify(auth));
      })
      .catch((err) => {
        dispatch({ type: AUTH.LOGIN, state: STATE.FAILED, payload: err });
        dispatch({
          type: ADD_TOAST,
          toast: {
            text: STATE_STRINGS.WRONG_CREDENTIALS,
            timeout: 40000,
          },
        });
      });
  };
}

export function logout() {
  localStorage.removeItem('auth');
  return (dispatch) => {
    dispatch({
      type: AUTH.LOGOUT,
      state: STATE.SUCCESS,
    });
  };
}
