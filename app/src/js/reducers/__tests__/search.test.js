import defaultStates from '../../consts/default_states';
import { SEARCH } from '../../consts/types';
import reduce from '../search';

const defaultState = defaultStates.search;

describe('[Reducer] search', () => {
  it('should return the default state', () => {
    const newState = reduce(defaultState, {});
    expect(newState).toEqual(defaultState);
  });
  it('should handle ADDTOFREQ', () => {
    const action = {
      type: SEARCH.ADDTOFREQ,
      term: 'something',
    };

    const newState = reduce(defaultState, action);
    const expected = ['something'];

    expect(newState).toEqual(expected);
  });
});
