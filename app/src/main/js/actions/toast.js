let timer = null;
export default (dispatch, text, timeout = 4000) => {
  if (timer) {
    clearTimeout(timer);
  }
  dispatch({
    type: 'TOAST_SHOW',
    text,
  });
  timer = setTimeout(() => {
    dispatch({
      type: 'TOAST_HIDE',
    });
  }, timeout);
};
