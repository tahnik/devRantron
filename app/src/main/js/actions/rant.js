import rantscript from '../consts/rantscript';
import {
  FETCH_RANT,
  CLOSE_RANT,
  COMMENT_POST,
  UPVOTE_RANT,
  UPVOTE_COMMENT,
  STATE_STRINGS,
} from '../consts/rants';
import STATE from '../consts/state';
import {
  ADD_TOAST,
} from '../consts/toast';

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
      })
      .catch((err) => {
        dispatch({ type: FETCH_RANT, state: STATE.FAILED, payload: err });
        dispatch({
          type: ADD_TOAST,
          toast: {
            text: STATE_STRINGS.FAILED_GET_RANT,
            timeout: 40000,
          },
        });
      });
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
