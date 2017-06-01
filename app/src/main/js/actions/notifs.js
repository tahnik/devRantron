import { NOTIFS, STATE } from '../consts/types';
import rantscript from '../consts/rantscript';

const fetchNotifs = () => (dispatch, getState) => {
  const auth = getState().auth;
  dispatch({
    type: NOTIFS.FETCH,
    notifs: null,
    state: STATE.LOADING,
  });
  if (!auth.user) {
    return;
  }
  rantscript
  // .notifications(auth.user.authToken, this.state.notifTimestamp)
  .notifications(auth.user.authToken, 1)
  .then((res) => {
    /*
    * We have got a successful response, let's dispatch to let
    * redux store know about it
    */
    dispatch({
      type: NOTIFS.FETCH,
      notifs: res,
      state: STATE.SUCCESS,
    });
  })
  .catch(() => {
    // Just in case it fails, we dispatch a failure
    dispatch({
      type: NOTIFS.FETCH,
      state: STATE.FAILED,
    });
  });
};

const clearNotif = id => (dispatch, getState) => {
  const currentNotifs = { ...getState().notifs.notifs };
  for (let index = 0; index < currentNotifs.data.items.length; index += 1) {
    if (currentNotifs.data.items[index].rant_id === id) {
      if (currentNotifs.data.items[index].read !== 1) {
        currentNotifs.data.items[index].read = 1;
      }
    }
  }
  dispatch({
    type: NOTIFS.FETCH,
    notifs: currentNotifs,
    state: STATE.SUCCESS,
  });
};

export { fetchNotifs, clearNotif }; //eslint-disable-line
