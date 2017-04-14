import rantscript from 'rantscript';
import AUTH from '../consts/auth';
import STATE from '../consts/state';

// change to disable comprssion in production
rantscript.httpSettings.SET_COMPRESS(false);
// only execute if we are in development
if (process.env.NODE_ENV === 'development') {
  rantscript.httpSettings.SET_DEBUG(true);
}

export function login(username, password) {
  console.log(username)
  return (dispatch) => {
    dispatch({
      type: AUTH.LOGIN,
      state: STATE.LOADING,
    });
    rantscript
      .login(username, password)
      .then((res) => {
        console.log("PAYLOAD MFUCKERS!");
        console.log(res)
        dispatch({
          type: AUTH.LOGIN,
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

export function logout() {
  return (dispatch) => {
    dispatch({
      type: AUTH.LOGIN,
      state: STATE.SUCCESS,
    });
  };
}
