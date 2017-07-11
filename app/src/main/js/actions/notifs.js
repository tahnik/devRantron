import { NOTIFS } from '../consts/types';
import rantscript from '../consts/rantscript';

let clearingNotif = false;

const fetchNotifs = () => (dispatch, getState) => {
  const auth = getState().auth;
  if (!auth.user) {
    return;
  }
  rantscript
  .notifications(auth.user.authToken, 1)
  .then((res) => {
    /*
    * We have got a successful response, let's dispatch to let
    * redux store know about it
    */
    const notifs = {
      items: res.data.items,
      check_time: res.data.check_time,
      username_map: res.data.username_map,
      num_unread: res.data.num_unread,
    };
    if (!clearingNotif) {
      dispatch({
        type: NOTIFS.FETCH,
        notifs,
      });
    }
  })
  .catch(() => {

  });
};

const clearNotifs = () => (dispatch, getState) => {
  dispatch({
    type: NOTIFS.CLEARALL,
  });
  const auth = getState().auth;
  if (!auth.user) {
    return;
  }
  clearingNotif = true;
  rantscript
  .clearNotifications(auth.user.authToken)
  .then(() => {
    clearingNotif = false;
  })
  .catch(() => {
    clearingNotif = false;
  });
};

export { fetchNotifs, clearNotifs }; //eslint-disable-line
