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
  console.log('--------------GETTING NEW STUFF--------------')
  const leftSide = [];
  const rightSide = [];
  const col0 = document.getElementById('column0');
  const col1 = document.getElementById('column1');
  let col0Height = 0;
  let col1Height = 0;
  if (col0) {
    col0Height = col0.clientHeight;
    col1Height = col1.clientHeight;
  }
  for (let i = 0; i < newRants.length; i += 1) {


    const content = '<div class="rant_card" ><div class="card"><div class="card-content" ><pre><p>' + newRants[i].text + '</p></pre></div></div></div>';
    const hiddenRant = document.getElementById('hiddenRant');
    let rantHeight = 0;
    if (hiddenRant) {
      document.getElementById('hiddenRant').innerHTML = content;
      rantHeight = hiddenRant.clientHeight;
    }




    if (col0Height < col1Height) {
      leftSide.push(newRants[i]);
      col0Height += rantHeight;
      if (newRants[i].attached_image !== '') {
        col0Height += 300;
      }
    } else {
      rightSide.push(newRants[i]);
      col1Height += rantHeight;
      if (newRants[i].attached_image !== '') {
        col1Height += 300;
      }
    }
    console.log(col0Height);
    console.log(col1Height);
    console.log(newRants[i]);
    console.log(rantHeight);
    console.log('-------------------------------');
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
