import rantscript from '../consts/rantscript';
import { COMMENT_POST, FETCH_RANT } from '../consts/rants';
import STATE from '../consts/state';
import STATE_STRINGS from '../consts/comment_post';
import {
  ADD_TOAST,
} from '../consts/toast';

export function postComment(commenText, commentId, authToken) {;
  return (dispatch) => {
    dispatch({
      type: COMMENT_POST.POST,
      state: STATE.LOADING,
    });
    rantscript
      .postComment(commenText, commentId, authToken)
      .then(() => {
        dispatch({
          type: COMMENT_POST.POST,
          state: STATE.SUCCESS,
        });
        rantscript
          .rant(commentId)
          .then((res) => {
            dispatch({
              type: FETCH_RANT,
              state: STATE.SUCCESS,
              payload: res,
            });
          });
      })
      .catch((err) => {
        dispatch({ type: COMMENT_POST.POST, state: STATE.FAILED, payload: err });
        dispatch({
          type: ADD_TOAST,
          toast: {
            text: STATE_STRINGS.FAILED_TO_POST,
            timeout: 4000,
          },
        });
      });
  };
}

export function updateCommentPost(text) {
  return (dispatch) => {
    dispatch({
      type: COMMENT_POST.UPDATE,
      payload: text,
    });
  };
}

export function clearCommentPost() {
  return (dispatch) => {
    dispatch({
      type: COMMENT_POST.CLEAR,
    });
  };
}

export function addUserCommentPost(username) {
  return (dispatch) => {
    dispatch({
      type: COMMENT_POST.ADD_USER,
      user: username,
    });
  };
}
