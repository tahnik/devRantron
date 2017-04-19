import {
  FETCH_RANT,
  CLOSE_RANT,
  COMMENT_POST,
  UPVOTE_RANT,
  UPVOTE_COMMENT,
} from '../consts/rants';
import STATE from '../consts/state';

const rantscript = require('electron').remote.require('rantscript');

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
  };
}

export function upvote(rantId, tokenId, tokenKey, userId) {
  return (dispatch) => {
    dispatch({
      type: UPVOTE_RANT,
      state: STATE.LOADING,
    });
    rantscript
      .vote(1, rantId, tokenId, tokenKey, userId)
      .then(() => {
        dispatch({
          type: UPVOTE_RANT,
          state: STATE.SUCCESS,
        });
      });
  };
}

export function upvoteComment(commentId, tokenId, tokenKey, userId) {
  return (dispatch) => {
    dispatch({
      type: UPVOTE_COMMENT,
      state: STATE.LOADING,
    });
    rantscript
      .voteComment(1, commentId, tokenId, tokenKey, userId)
      .then(() => {
        dispatch({
          type: UPVOTE_COMMENT,
          state: STATE.SUCCESS,
        });
      });
  };
}

export function postComment(commenText, commentId, tokenId, tokenKey, userId) {
  return (dispatch) => {
    dispatch({
      type: COMMENT_POST.POST,
      state: STATE.LOADING,
    });
    rantscript
      .voteComment(commenText, commentId, tokenId, tokenKey, userId)
      .then(() => {
        dispatch({
          type: COMMENT_POST.POST,
          state: STATE.SUCCESS,
        });
      });
  };
}
