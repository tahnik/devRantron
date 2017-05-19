import { NOTIFS } from '../consts/types';

const fetchNotif = (notifs, state) => (dispatch) => {
  dispatch({
    type: NOTIFS.FETCH,
    notifs,
    state,
  });
};

export { fetchNotif }; //eslint-disable-line
