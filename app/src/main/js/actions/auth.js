import rantscript from '../consts/rantscript';
import showToast from './toast';
import { AUTH, STATE } from '../consts/types';

const login = (username, password) => (dispatch) => {
  dispatch({
    type: AUTH.LOGIN,
    state: STATE.LOADING,
  });
  rantscript.login(username, password)
    .then((res) => {
      const user = {
        authToken: res.auth_token,
        id: res.auth_token.id,
      };
      dispatch({
        type: AUTH.LOGIN,
        state: STATE.SUCCESS,
        user,
      });
    })
    .catch(() => {
      showToast(dispatch, 'Username or Password is wrong');
      dispatch({
        type: AUTH.LOGIN,
        state: STATE.FAILED,
      });
    });
};

export { login };
