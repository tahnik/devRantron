import defaultStates from '../../consts/default_states';
import reduce from '../index';

describe('[Reducer] index', () => {
  it('should return the default state', () => {
    const newState = reduce(defaultStates, {});
    expect(newState).toEqual(defaultStates);
  });
});
