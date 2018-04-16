import defaultStates from '../../consts/default_states';
import { MODAL } from '../../consts/types';
import reduce from '../modal';

const defaultState = defaultStates.modal;

describe('[Reducer] modal', () => {
  it('should return the default state', () => {
    const newState = reduce(defaultState, {});
    expect(newState).toEqual(defaultState);
  });
  it('should handle OPEN', () => {
    const action = {
      type: MODAL.OPEN,
      item: {
        type: 'rant',
        id: 1,
        data: {
          test: 'test',
        },
      },
    };

    const newState = reduce(defaultState, action);
    const expected = {
      item: {
        type: 'rant',
        id: 1,
        data: {
          test: 'test',
        },
      },
    };

    expect(newState).toEqual(expected);
  });
  it('should handle CLOSE', () => {
    const action = {
      type: MODAL.CLOSE,
    };

    const newState = reduce(defaultState, action);
    const expected = {
      item: null,
    };

    expect(newState).toEqual(expected);
  });
});
