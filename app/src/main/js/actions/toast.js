import { TOAST } from '../consts/types';

let timer = null;
export default (dispatch, text, timeout = 4000) => {
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
