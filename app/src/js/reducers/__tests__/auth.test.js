import defaultStates from '../../consts/default_states';
import { AUTH, STATE } from '../../consts/types';
import reduce from '../auth';

const defaultState = defaultStates.auth;

describe('[Reducer] auth', () => {
  it('should return the default state', () => {
    const newState = reduce(defaultState, {});
    expect(newState).toEqual(defaultState);
  });
  it('should handle LOGOUT', () => {
    const action = { type: AUTH.LOGOUT };
    const newState = reduce(defaultState, action);
    const expected = {
      noLogin: false,
      state: STATE.INITIAL,
      user: null,
    };

    expect(newState).toEqual(expected);
  });
  it('should handle NOLOGIN', () => {
    const action = {
      type: AUTH.NOLOGIN,
      payload: true,
    };

    const newState = reduce(defaultState, action);
    const expected = {
      noLogin: true,
      state: STATE.INITIAL,
      user: null,
    };

    expect(newState).toEqual(expected);
  });
  it('should handle LOGIN (FAILED)', () => {
    const action = {
      type: AUTH.LOGIN,
      state: STATE.FAILED,
    };

    const newState = reduce(defaultState, action);
    const expected = {
      noLogin: false,
      state: STATE.FAILED,
      user: null,
    };

    expect(newState).toEqual(expected);
  });
  it('should handle LOGIN (SUCCESS)', () => {
    const action = {
      type: AUTH.LOGIN,
      state: STATE.SUCCESS,
      user: true,
    };

    const newState = reduce(defaultState, action);
    const expected = {
      noLogin: false,
      state: STATE.SUCCESS,
      user: true,
    };

    expect(newState).toEqual(expected);
  });
  it('should handle LOGIN (LOADING)', () => {
    const action = {
      type: AUTH.LOGIN,
      state: STATE.LOADING,
    };

    const newState = reduce(defaultState, action);
    const expected = {
      noLogin: false,
      state: STATE.LOADING,
      user: null,
    };

    expect(newState).toEqual(expected);
  });
});
