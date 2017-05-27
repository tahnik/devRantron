import rantscript from '../consts/rantscript';
import { ITEM, AUTH, FEED } from '../consts/types';
import showToast from './toast';


const voteRant = (voteState = 1, rantID) => (dispatch, getState) => {
  const { user } = getState().auth;
  let authToken = null;
  if (user) {
    authToken = user.authToken;
  } else {
    dispatch(showToast(dispatch, 'Log in to vote'));
    dispatch({
      type: AUTH.NOLOGIN,
      payload: false,
    });
    // annoying?
    dispatch({
      type: FEED.ACTION.RESET,
    });
    return;
  }
  rantscript
      .vote(voteState, rantID, authToken)
      .then(() => {
      })
      .catch(() => {
        dispatch(showToast('Username or Password is wrong'));
      });
};

const voteComment = (voteState = 1, commentID) => (dispatch, getState) => {
  const { user } = getState().auth;
  let authToken = null;
  if (user) {
    authToken = user.authToken;
  } else {
    dispatch(showToast('Log in to vote'));
    dispatch({
      type: AUTH.NOLOGIN,
      payload: false,
    });
    // annoying?
    dispatch({
      type: FEED.ACTION.RESET,
    });
    return;
  }
  rantscript
      .voteComment(voteState, commentID, authToken)
      .then(() => {
      })
      .catch(() => {
        dispatch(showToast('Username or Password is wrong'));
      });
};

const vote = (voteState = 1, id, type) => {
  switch (type) {
    case ITEM.RANT.NAME:
      return voteRant(voteState, id);
    case ITEM.COMMENT.NAME:
      return voteComment(voteState, id);
    default:
      return voteRant(voteState, id);
  }
};

export { vote as default };
