import { COMMENT_POST, FETCH_RANT } from '../consts/rants';
import STATE from '../consts/state';

const rantscript = require('electron').remote.require('rantscript');

export function postComment(commenText, commentId, authToken) {
  return (dispatch) => {
    dispatch({
      type: COMMENT_POST.POST,
      state: STATE.LOADING,
    });
    console.log(commenText);
    console.log(commentId);
    console.log(authToken);
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
