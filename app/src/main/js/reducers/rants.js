import { FETCH_RANTS, RESET_PAGE } from '../consts/rants';
import { STATE } from '../consts/state';
import { FEED } from '../consts/feed';

const DEFAULT_STATE = {
  currentRants: [],
  state: STATE.SUCCESS,
  feedType: FEED.RANTS.ALGO,
  page: 0,
};

let col1len = 0;
let col2len = 0;

function breakDownRants(prevRants, newRants) {
  const leftSide = [];
  const rightSide = [];
  for (let i = 0; i < newRants.length; i += 1) {
    if (col1len <= col2len) {
      leftSide.push(newRants[i]);
      col1len += newRants[i].text.length;
      if(newRants[i].attached_image !== "") {
        // Found this to work good on images. Feel free to change if you find something better
        col1len += 1500;
      }
    } else {
      rightSide.push(newRants[i]);
      col2len += newRants[i].text.length;
      if(newRants[i].attached_image !== "") {
        // Found this to work good on images. Feel free to change if you find something better
        col2len += 1500;
      }
    }
  }

  if (prevRants[0]) {
    return ([[...prevRants[0], ...leftSide], [...prevRants[1], ...rightSide]]);
  }
  return ([leftSide, rightSide]);
}

export function rants(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case FETCH_RANTS:
      switch (action.state) {
        case STATE.LOADING:
          return {
            ...state,
            state: action.state,
            feedType: action.feedType,
          };
        case STATE.SUCCESS:
          const newPage = state.page + 1;
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
      break;
    case RESET_PAGE:
      return { ...state, currentRants: [], page: 1 };
  }
  return state;
}
