import DEFAULT_STATES from '../consts/default_states';
import { SEARCH } from '../consts/types';

export default (state = DEFAULT_STATES.search, action) => {
  switch (action.type) {
    case SEARCH.ADDTOFREQ:
      return Array.from(new Set([...state, action.term]));
    default:
      return state;
  }
};
