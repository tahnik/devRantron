import defaultStates from '../../consts/default_states';
import { USER, STATE } from '../../consts/types';
import reduce from '../user';

const defaultState = defaultStates.user;

describe('[Reducer] user', () => {
  it('should return the default state', () => {
    const newState = reduce(defaultState, {});
    expect(newState).toEqual(defaultState);
  });
  it('should handle REMOVE', () => {
    const action = {
      type: USER.REMOVE,
    };

    const newState = reduce(defaultState, action);
    const expected = {
      profile: null,
      state: STATE.INITIAL,
    };

    expect(newState).toEqual(expected);
  });
  describe('reduces FETCH properly', () => {
    it('should ignore invalid states', () => {
      const action = {
        type: USER.FETCH,
        state: 'invalid',
      };

      const newState = reduce(defaultState, action);
      const expected = {
        profile: null,
        state: STATE.INITIAL,
      };

      expect(newState).toEqual(expected);
    });
    it('should handle on SUCCESS', () => {
      const action = {
        type: USER.FETCH,
        state: STATE.SUCCESS,
        profile: 'test',
      };

      const newState = reduce(defaultState, action);
      const expected = {
        profile: 'test',
        state: STATE.SUCCESS,
      };

      expect(newState).toEqual(expected);
    });
    it('should handle on FAILED', () => {
      const action = {
        type: USER.FETCH,
        state: STATE.FAILED,
      };

      const newState = reduce(defaultState, action);
      const expected = {
        profile: null,
        state: STATE.FAILED,
      };

      expect(newState).toEqual(expected);
    });
    it('should handle on LOADING', () => {
      const action = {
        type: USER.FETCH,
        state: STATE.LOADING,
      };

      const newState = reduce(defaultState, action);
      const expected = {
        profile: null,
        state: STATE.LOADING,
      };

      expect(newState).toEqual(expected);
    });
  });
});
