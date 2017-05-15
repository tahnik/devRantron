import rantscript from '../consts/rantscript';
import { USER, STATE } from '../consts/types';
import showToast from './toast';

const fetchUser = () => (dispatch, getState) => {
  const { user } = getState().auth;
  dispatch({
    type: USER.FETCH,
    state: STATE.LOADING,
  });
  let userID = null;
  if (user) {
    userID = user.authToken.user_id;
  } else {
    dispatch({
      type: USER.FETCH,
      state: STATE.FAILED,
    });
    return;
  }
  rantscript
      .profile(userID)
      .then((res) => {
        dispatch({
          type: USER.FETCH,
          state: STATE.SUCCESS,
          profile: res,
        });
      })
      .catch(() => {
        showToast(dispatch, 'User is not logged in');
        dispatch({
          type: USER.FETCH,
          state: STATE.FAILED,
        });
      });
};

export { fetchUser };
