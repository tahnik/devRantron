import rantscript from '../consts/rantscript';
import { ITEM, AUTH, FEED } from '../consts/types';
import showToast from './toast';


/**
 * Votes a rant. If there is not user, shows the login page
 *
 * @param {number} [voteState=1] Always upvote unless specified otherwise
 * @param {number} rantID ID of the rant to upvote (works for collab too)
 */
const voteRant = (voteState = 1, rantID) => (dispatch, getState) => {
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

/**
 * Votes a comment. If there is not user, shows the login page
 *
 * @param {number} [voteState=1] Always upvote unless specified otherwise
 * @param {number} commentID ID of the comment
 */
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

/**
 * Reusability. Determines what to vote
 *
 * @param {number} [voteState=1] Always upvote unless specified otherwise
 * @param {any} id id of the comment or rant
 * @param {any} type If it is a comment or rant
 */
const vote = (voteState = 1, id, type) => (dispatch) => {
  switch (type) {
    case ITEM.RANT.NAME:
      dispatch(voteRant(voteState, id));
      break;
    case ITEM.COMMENT.NAME:
      dispatch(voteComment(voteState, id));
      break;
    default:
      dispatch(voteRant(voteState, id));
  }
};

export { vote as default };
