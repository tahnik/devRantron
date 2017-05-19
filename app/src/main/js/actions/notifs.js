import { NOTIFS } from '../consts/types';

const fetchNotifs = (notifs, state) => (dispatch) => {
  dispatch({
    type: NOTIFS.FETCH,
    notifs,
    state,
  });
};

export { fetchNotifs }; //eslint-disable-line
