import electron from 'electron';
import AUTH from '../consts/auth';
import STATE from '../consts/state';

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
        dispatch({
          type: AUTH.LOGIN,
          state: STATE.SUCCESS,
          payload: res.auth_token,
        });
      })
      .catch((err) => {
        dispatch({ type: AUTH.LOGIN, state: STATE.FAILED, payload: err });
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
