import { FETCH_RANTS, RESET_PAGE } from '../consts/rants';
import { STATE } from '../consts/state';
import { FEED } from '../consts/feed';

const DEFAULT_STATE = {
  currentRants: [],
  state: STATE.SUCCESS,
  feedType: FEED.RANTS.ALGO,
  page: 0,
};

function breakDownRants(prevRants, newRants) {
  const leftSide = [];
  const rightSide = [];
  const col0 = document.getElementById('column0');
  const col1 = document.getElementById('column1');
  const hiddenRant = document.getElementById('hiddenRant');
  let col0Height = 0;
  let col1Height = 0;
  const colWidth = hiddenRant.clientWidth;
  if (col0) {
    col0Height = col0.clientHeight;
    col1Height = col1.clientHeight;
  }
  for (let i = 0; i < newRants.length; i += 1) {


    const content = '<div class="rant_card" ><div class="card"><div class="card-content" ><pre><p>' + newRants[i].text + '</p></pre></div></div></div>';
    let rantHeight = 0;
    document.getElementById('hiddenRant').innerHTML = content;
    rantHeight = hiddenRant.clientHeight;

    if (col0Height < col1Height) {
      leftSide.push(newRants[i]);
      col0Height += rantHeight;
      if (newRants[i].attached_image !== '') {
        const heightRatio = newRants[i].attached_image.height / newRants[i].attached_image.width;

        const imageHeight = colWidth * heightRatio;
        col0Height += imageHeight;
      }
    } else {
      rightSide.push(newRants[i]);
      col1Height += rantHeight;
      if (newRants[i].attached_image !== '') {
        const heightRatio = newRants[i].attached_image.height / newRants[i].attached_image.width;

        const imageHeight = colWidth * heightRatio;
        col1Height += imageHeight;
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
