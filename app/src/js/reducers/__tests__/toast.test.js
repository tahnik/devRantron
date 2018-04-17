import defaultStates from '../../consts/default_states';
import { TOAST } from '../../consts/types';
import reduce from '../toast';

const defaultState = defaultStates.toast;

describe('[Reducer] toast', () => {
  it('should return the default state', () => {
    const newState = reduce(defaultState, {});
    expect(newState).toEqual(defaultState);
  });
  it('should handle SHOW', () => {
    const action = {
      type: TOAST.SHOW,
      text: 'test',
    };

    const newState = reduce(defaultState, action);
    const expected = {
      text: 'test',
      isVisible: true,
    };

    expect(newState).toEqual(expected);
  });
  it('should handle HIDE', () => {
    const action = {
      type: TOAST.HIDE,
    };

    const newState = reduce(defaultState, action);
    const expected = {
      text: '',
      isVisible: false,
    };

    expect(newState).toEqual(expected);
  });
});
