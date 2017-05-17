import rantscript from '../consts/rantscript';
import showToast from './toast';
import { AUTH, STATE, USER, FEED } from '../consts/types';

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
      rantscript
      .profile(user.id)
      .then((resUser) => {
        dispatch({
          type: USER.FETCH,
          state: STATE.SUCCESS,
          profile: resUser,
        });
      })
      .catch(() => {
        showToast(dispatch, 'User is not logged in');
        dispatch({
          type: USER.FETCH,
          state: STATE.FAILED,
        });
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

const noLogin = bool => (dispatch) => {
  dispatch({
    type: AUTH.NOLOGIN,
    payload: bool,
  });
  if (!bool) {
    dispatch({
      type: FEED.RANTS.ACTION.RESET,
    });
  }
};

const logout = () => (dispatch) => {
  dispatch({
    type: AUTH.LOGOUT,
  });
  dispatch({
    type: USER.REMOVE,
  });
  dispatch({
    type: FEED.RANTS.ACTION.RESET,
  });
};

export { login, noLogin, logout };
