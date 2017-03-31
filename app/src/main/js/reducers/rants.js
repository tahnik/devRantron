import { FETCH_RANTS } from '../consts/rants';
import { STATE } from '../consts/state';
import { FEED } from '../consts/feed';

const DEFAULT_STATE = {
  currentRants: [],
  state: STATE.SUCCESS,
  feedType: FEED.RANTS.ALGO,
  page: 0,
};

function breakDownRants(prevRants, newRants) {
  const halfLength = Math.ceil(newRants.length / 2);
  const leftSide = newRants.splice(0, halfLength);
  if (prevRants[0]) {
    return ([[...leftSide, ...prevRants[0]], [...newRants, ...prevRants[1]]]);
  }
  return ([leftSide, newRants]);
}

export function rants(state = DEFAULT_STATE, action) {
  if (action.type === FETCH_RANTS) {
    switch (action.state) {
      case STATE.LOADING:
        return {
          ...state,
          state: action.state,
          feedType: action.feedType,
        };
      case STATE.SUCCESS:
        let newPage = state.page + 1;
        console.log(newPage);
        return {
          ...state,
          currentRants: breakDownRants(state.currentRants, action.payload),
          state: action.state,
          feedType: action.feedType,
          page: newPage,
        };
      case STATE.FAILED:
        return { ...state, state: action.state, feedType: action.feedType };
    }
  }
  return state;
}
