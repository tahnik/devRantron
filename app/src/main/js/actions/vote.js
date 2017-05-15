import rantscript from '../consts/rantscript';
import { STATE, FEED } from '../consts/types';
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

const vote = (voteState = 1, id, type) => {
  switch (type) {
    case FEED.ITEM.TYPE.RANT:
      return voteRant(voteState, id);
    default:
      return voteRant(voteState, id);
  }
};

export { vote as default };
