import DEFAULT_STATES from '../consts/default_states';
import { COLUMNS, COLUMN } from '../consts/types';

export default (state = DEFAULT_STATES.columns, action) => {
  switch (action.type) {
    case COLUMN.FETCH: {
      const reqColumn = state.filter(column => column.id === action.column.id)[0];
      const index = state.indexOf(reqColumn);
      const newColumns = state.slice();
      if (reqColumn) {
        newColumns[index] = action.column;
      }
      return newColumns;
    }
    case COLUMNS.ADD: {
      return [...state, action.column];
    }
    case COLUMNS.REMOVE: {
      const reqColumn = state.filter(column => column.id === action.id)[0];
      const index = state.indexOf(reqColumn);
      const newColumns = state.slice();
      if (reqColumn) {
        newColumns.splice(index, 1);
      }
      return newColumns;
    }
    case COLUMNS.RESET: {
      return DEFAULT_STATES.columns;
    }
    default:
      return state;
  }
};
