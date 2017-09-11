import { SEARCH } from '../consts/types';

export default (state = [], action) => {
  switch (action.type) {
    case SEARCH.ADDTOFREQ:
      return Array.from(new Set([...state, action.term]));
    default:
      return state;
  }
};
