import defaultStates from '../../consts/default_states';
import { COLUMNS, STATE } from '../../consts/types';
import reduce from '../columns';

const defaultState = defaultStates.columns;

describe('[Reducer] columns', () => {
  it('should return the default state', () => {
    const newState = reduce(defaultState, {});
    expect(newState).toEqual(defaultState);
  });
  it('should handle RESET', () => {
    const action = { type: COLUMNS.RESET };
    const newState = reduce(defaultState, action);

    expect(newState).toEqual(defaultState);
  });
  it('should handle REMOVE', () => {
    const action = {
      type: COLUMNS.REMOVE,
      id: 1,
    };

    const state = [
      { id: 1 },
      { id: 2 },
    ];

    const newState = reduce(state, action);
    const expected = [{ id: 2 }];

    expect(newState).toEqual(expected);
  });
  it('should handle ADD', () => {
    const action = {
      type: COLUMNS.ADD,
      column: defaultStates.column,
    };

    const newState = reduce(defaultState, action);
    const expected = [defaultStates.column];

    expect(newState).toEqual(expected);
  });
  it('should handle UPDATE_SCROLL', () => {
    const column = defaultStates.column;
    const action = {
      type: COLUMNS.UPDATE_SCROLL,
      column,
    };

    const newState = reduce(defaultState, action);
    expect(newState).toEqual(defaultState);
  });
  it('should handle FETCH', () => {
    // The default state should be enough...?
    const column = defaultStates.column;
    const action = {
      type: COLUMNS.FETCH,
      column,
    };

    const newState = reduce(defaultState, action);
    expect(newState).toEqual(defaultState);
  });
});
