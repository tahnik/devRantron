import {
  ADD_TOAST,
  REMOVE_TOAST,
} from '../consts/toast';

/* eslint-disable */
/*
 * Feel free to change this with something much simpler.
 * I need to get this done - TM
 */
function generateUUID() { // Public Domain/MIT
  let d = new Date().getTime();
  if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
    d += performance.now(); // use high-precision timer if available
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}
/* eslint-enable */

export function showToast(type, text, timeout, links) {
  return (dispatch) => {
    const toast = {
      text,
      links,
      timeout,
      id: generateUUID(),
    };
    dispatch({
      type: ADD_TOAST,
      toast,
    });
  };
}

export function removeToast(id) {
  return (dispatch) => {
    dispatch({
      type: REMOVE_TOAST,
      id,
    });
  };
}
