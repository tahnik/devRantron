import DEFAULT_STATES from '../consts/default_states';
import { NOTIFS } from '../consts/types';

export default (state = DEFAULT_STATES.notifs, action) => {
  switch (action.type) {
    case NOTIFS.FETCH:
      return action.notifs;
    case NOTIFS.CLEAR:
      return { ...state, items: action.items, num_unread: action.num_unread };
    case NOTIFS.CLEARALL:
      return { ...state, num_unread: 0 };
    default:
      return state;
  }
};
