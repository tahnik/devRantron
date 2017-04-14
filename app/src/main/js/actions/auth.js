import rantscript from 'rantscript';
import AUTH from '../consts/auth';
import STATE from '../consts/state';

// change to disable comprssion in production
rantscript.httpSettings.SET_COMPRESS(false);
// only execute if we are in development
if (process.env.NODE_ENV === 'development') {
  rantscript.httpSettings.SET_DEBUG(true);
}

export function signIn(username, password) {
  return (dispatch) => {
    dispatch({
      type: AUTH.SIGN_IN,
      state: STATE.LOADING,
    });
    rantscript
      .login(username, password)
      .then((res) => {
        dispatch({
          type: AUTH.SIGN_IN,
          state: STATE.SUCCESS,
          payload: res.token,
        });
      });
      /*
      TODO: This needs to be fixed. Commented until @rekkyrek fixes the API
      .catch((err) => {
        dispatch({ type: FETCH_RANTS, state: STATE.FAILED, payload: err, feedType: type });
      });
      */
  };
}

export function signOut() {
  return (dispatch) => {
    dispatch({
      type: AUTH.SIGN_OUT,
      state: STATE.SUCCESS,
    });
  };
}
