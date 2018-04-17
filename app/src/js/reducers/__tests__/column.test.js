import defaultStates from '../../consts/default_states';
import { COLUMN } from '../../consts/types';
import reduce from '../column';

const defaultState = defaultStates.column;

describe('[Reducer] column', () => {
  it('should return the default state', () => {
    const newState = reduce(defaultState, {});
    expect(newState).toEqual(defaultState);
  });
  it('should handle FETCH', () => {
    // The default state should be enough...?
    const column = defaultState;
    const action = {
      type: COLUMN.FETCH,
      column,
    };

    const newState = reduce(defaultState, action);
    expect(newState).toEqual(defaultState);
  });
  it('should handle RESET', () => {
    // The default column is used to reset between views.
    const column = defaultState;
    const action = {
      type: COLUMN.RESET,
      column,
    };

    const newState = reduce(defaultState, action);
    expect(newState).toEqual(defaultState);
  });
});
