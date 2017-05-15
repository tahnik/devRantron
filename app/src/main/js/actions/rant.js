import rantscript from '../consts/rantscript';
import { FEED, STATE } from '../consts/types';
import showToast from './toast';

const voteRant = (voteState = 1, rantID) => (dispatch, getState) => {
  const { user } = getState().auth;
  dispatch({
    type: FEED.RANT.ACTION.VOTE,
    state: STATE.LOADING,
  });
  let authToken = null;
  if (user) {
    authToken = user.authToken;
  } else {
    showToast(dispatch, 'Are you logged in?');
    dispatch({
      type: FEED.RANT.ACTION.VOTE,
      state: STATE.FAILED,
    });
  }
  rantscript
      .vote(voteState, rantID, authToken)
      .then(() => {
        dispatch({
          type: FEED.RANT.ACTION.UPVOTE,
          state: STATE.SUCCESS,
        });
      })
      .catch(() => {
        showToast(dispatch, 'Username or Password is wrong');
        dispatch({
          type: FEED.RANT.ACTION.VOTE,
          state: STATE.FAILED,
        });
      });
};

const fetchRant = id => (dispatch) => {
  dispatch({
    type: FEED.ITEM.ACTION.GET,
    state: STATE.LOADING,
  });
  rantscript
  .rant(id)
  .then((res) => {
    dispatch({
      type: FEED.ITEM.ACTION.GET,
      itemType: FEED.ITEM.TYPE.RANT,
      state: STATE.SUCCESS,
      id,
      item: res,
    });
  })
  .catch(() => {
    showToast(dispatch, 'Could not get rant');
    dispatch({
      type: FEED.ITEM.ACTION.GET,
      state: STATE.FAILED,
    });
  });
};

export { voteRant, fetchRant };
