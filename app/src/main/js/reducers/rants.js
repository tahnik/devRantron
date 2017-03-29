import { FETCH_RANTS } from '../consts/rants';
import { STATE } from '../consts/state';

const DEFAULT_STATE = {
  currentRants: [],
  state: STATE.SUCCESS,
};

export function rants(state = DEFAULT_STATE, action) {
  if (action.type === FETCH_RANTS) {
    switch (action.state) {
      case STATE.LOADING:
        return { ...state, state: action.state };
      case STATE.SUCCESS:
        return {
          ...state,
          currentRants: action.payload,
          state: action.state,
        };
      case STATE.FAILED:
        return { ...state, state: action.state };
    }
  }
  return state;
}
