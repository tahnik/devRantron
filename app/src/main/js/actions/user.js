import rantscript from '../consts/rantscript';
import { USER, STATE } from '../consts/types';
import showToast from './toast';

/**
 * Fetches a user. But does not store user's rants or comments as it is
 * unnecessary to keep this huge amount of rants in state
 */
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
        dispatch(showToast('User is not logged in'));
        dispatch({
          type: USER.FETCH,
          state: STATE.FAILED,
        });
      });
};

export { fetchUser }; //eslint-disable-line
