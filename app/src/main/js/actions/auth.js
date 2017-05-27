import rantscript from '../consts/rantscript';
import showToast from './toast';
import { AUTH, STATE, USER } from '../consts/types';
import { resetColumn } from './fetch';

/**
 * Logs in the user
 *
 * @param {string} username Either username or email
 * @param {string} password Password for the user
 */
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
      dispatch(showToast('Username or Password is wrong'));
      dispatch({
        type: AUTH.LOGIN,
        state: STATE.FAILED,
      });
    });
};

/**
 * If the user does not want to login but still want to browse rants, this
 * function dispatches the necessary action
 *
 * @param {bool} bool
 */
const noLogin = bool => (dispatch) => {
  dispatch({
    type: AUTH.NOLOGIN,
    payload: bool,
  });
};

/**
 * Logs out the user. Just removes the user and the token really
 *
 */
const logout = () => (dispatch) => {
  dispatch({
    type: AUTH.LOGOUT,
  });
  dispatch({
    type: USER.REMOVE,
  });
  dispatch(resetColumn());
};

export { login, noLogin, logout };
