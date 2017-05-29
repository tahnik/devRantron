import { TOAST } from '../consts/types';


let timer = null;
/**
 * Shows a toast (can be error, info etc)
 *
 * @param {any} text Text to show in the toast
 * @param {number} [timeout=4000] Can make the toast longer or shorter
 */
const showToast = (text, timeout = 4000) => (dispatch) => {
  if (timer) {
    clearTimeout(timer);
  }
  dispatch({
    type: TOAST.SHOW,
    text,
  });
  timer = setTimeout(() => {
    dispatch({
      type: TOAST.HIDE,
    });
  }, timeout);
};

export { showToast as default };
