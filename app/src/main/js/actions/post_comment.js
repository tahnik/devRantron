import { COMMENT_POST } from '../consts/rants';
import STATE from '../consts/state';

const rantscript = require('electron').remote.require('rantscript');

export function postComment(commenText, commentId, tokenId, tokenKey, userId) {
  return (dispatch) => {
    dispatch({
      type: COMMENT_POST.POST,
      state: STATE.LOADING,
    });
    console.log("Posting rants loading")
    rantscript
      .postComment(commenText, commentId, tokenId, tokenKey, userId)
      .then(() => {
        console.log("Posting rants success")
        dispatch({
          type: COMMENT_POST.POST,
          state: STATE.SUCCESS,
        });
      })
      .catch((err) => {
        console.log(err);
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
