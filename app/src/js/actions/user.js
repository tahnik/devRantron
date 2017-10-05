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
  const authToken = user.authToken;
  /**
   * Normally fetching a user fetches a lot of contents with it
   * we use collabs as most of the users don't have any and it uses
   * the least bandwidth
   */
  rantscript
    .profile(userID, authToken, 'collabs', 0)
    .then((res) => {
      const profile = {
        username: res.username,
        score: res.score,
        about: res.about,
        location: res.location,
        avatar: res.avatar,
        id: userID,
      };
      dispatch({
        type: USER.FETCH,
        state: STATE.SUCCESS,
        profile,
      });
    })
    .catch(() => {
      dispatch({
        type: USER.FETCH,
        state: STATE.FAILED,
      });
    });
};

export { fetchUser }; //eslint-disable-line
