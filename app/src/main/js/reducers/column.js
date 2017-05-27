import DEFAULT_STATES from '../consts/default_states';
import { COLUMN } from '../consts/types';

export default (state = DEFAULT_STATES.COLUMN, action) => {
  switch (action.type) {
    case COLUMN.FETCH:
      if (action.column.id === state.id) {
        return action.column;
      }
      return DEFAULT_STATES.COLUMN;
    case COLUMN.RESET:
      return action.column;
    default:
      return state;
  }
};
