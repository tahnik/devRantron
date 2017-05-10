import rantscript from '../consts/rantscript';
import {
  FETCH_RANT,
  CLOSE_RANT,
  COMMENT_POST,
  UPVOTE_RANT,
  UPVOTE_COMMENT,
} from '../consts/rants';
import STATE from '../consts/state';

export function fetchRant(id) {
  return (dispatch) => {
    dispatch({
      type: FETCH_RANT,
      state: STATE.LOADING,
    });
    rantscript
      .rant(id)
      .then((res) => {
        dispatch({
          type: FETCH_RANT,
          state: STATE.SUCCESS,
          payload: res,
        });
      });
      /*
      TODO: This needs to be fixed. Commented until @rekkyrek fixes the API
      .catch((err) => {
        dispatch({ type: FETCH_RANT, state: STATE.FAILED, payload: err });
      });
      */
  };
}

export function closeRant() {
  return (dispatch) => {
    dispatch({
      type: CLOSE_RANT,
    });
    dispatch({
      type: COMMENT_POST.CLEAR,
    });
  };
}

export function upvote(rantId, authToken) {
  return (dispatch) => {
    dispatch({
      type: UPVOTE_RANT,
      state: STATE.LOADING,
    });
    console.log(authToken);
    rantscript
      .vote(1, rantId, authToken)
      .then(() => {
        dispatch({
          type: UPVOTE_RANT,
          state: STATE.SUCCESS,
        });
      });
  };
}

export function upvoteComment(commentId, authToken) {
  return (dispatch) => {
    dispatch({
      type: UPVOTE_COMMENT,
      state: STATE.LOADING,
    });
    rantscript
      .voteComment(1, commentId, authToken)
      .then(() => {
        dispatch({
          type: UPVOTE_COMMENT,
          state: STATE.SUCCESS,
        });
      });
  };
}
