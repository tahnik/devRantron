import rantscript from '../consts/rantscript';
import showToast from './toast';

const login = (username, password) => (dispatch) => {
  dispatch({
    type: 'AUTH_LOGIN',
    state: 'STATE_LOADING',
  });
  rantscript.login(username, password)
    .then((res) => {
      const user = {
        authToken: res.auth_token,
        id: res.auth_token.id,
      };
      dispatch({
        type: 'AUTH_LOGIN',
        state: 'STATE_SUCCESS',
        user,
      });
    })
    .catch(() => {
      showToast(dispatch, 'Username or Password is wrong');
      dispatch({
        type: 'AUTH_LOGIN',
        state: 'STATE_FAILED',
      });
    });
};

export { login };
