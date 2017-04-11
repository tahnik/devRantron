import { FETCH_RANTS, RESET_PAGE, FETCH_RANT, CLOSE_RANT } from '../consts/rants';
import STATE from '../consts/state';
import FEED from '../consts/feed';

const DEFAULT_STATE = {
  currentRants: [],
  state: STATE.SUCCESS,
  feedType: FEED.RANTS.ALGO,
  page: 0,
};

/*
 * This function breaks down the rants into two columns
 * Right now the code is quite dependent on two columns only
 * hopefully in future, we will extend this so that we can have many columns
 * If you think you can do it, do a pull and do it now!
 */

function breakDownRants(prevRants, newRants) {
  // This array will contain the rants of each column
  const column0 = [];
  const column1 = [];

  // Get the to columns from body
  const col0 = document.getElementById('column0');
  const col1 = document.getElementById('column1');

  // Get the hidden div which is used to measure the dimension of a rant card
  const hiddenRant = document.getElementById('hiddenRant');

  let col0Height = 0;
  let col1Height = 0;

  // This is the height of the user profile on top of the rant card
  const userProfileHeight = 75;

  // Get the width of the hidden div. This width is equal to the width of a rant card
  const colWidth = hiddenRant.clientWidth;

  // col0 needs to be checked because at the very beginning it doesn't exist.
  if (col0) {
    col0Height = col0.clientHeight;
    col1Height = col1.clientHeight;
  }
  for (let i = 0; i < newRants.length; i += 1) {

    let trimmedString = newRants[i].text;
    if (newRants[i].text.length > 300) {
      const maxLength = 300;
      trimmedString = newRants[i].text.substr(0, maxLength);
      trimmedString = `${trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(' ')))}...(Read More)`;
    }

    /* Populate the hidden rant card so that it resembles the rant card
       which will be actually rendered in future
     */
    const content = `<div class="rant_card" ><div class="card"><div class="card-content" ><pre><p>${trimmedString}</p></pre></div></div></div>`;

    /* Now the get the height of the hiddent rant card.
       This height still doesn't consider the height of the image (if any)
     */
    document.getElementById('hiddenRant').innerHTML = content;
    const rantHeight = hiddenRant.clientHeight + userProfileHeight;

    /* Find out which column is shorter right now
     * Add the rant to the shorter column
     * add the height of the rant card (without image)
     * find out if there is any image with the rant
     * if any, calculate the height of the image using the ratio.
       Although the image data contains the height and width,
       it is going to be different when we put it in a rant card
       and set the image width to 100% of the rant card width)
     * then add the calculated image height to the column height.
     */
    if (col0Height < col1Height) {
      column0.push(newRants[i]);
      col0Height += rantHeight;
      if (newRants[i].attached_image !== '') {
        const heightRatio = newRants[i].attached_image.height / newRants[i].attached_image.width;

        const imageHeight = colWidth * heightRatio;
        col0Height += imageHeight;
      }
    } else {
      column1.push(newRants[i]);
      col1Height += rantHeight;
      if (newRants[i].attached_image !== '') {
        const heightRatio = newRants[i].attached_image.height / newRants[i].attached_image.width;

        const imageHeight = colWidth * heightRatio;
        col1Height += imageHeight;
      }
    }
  }

  // If there is any previous rant, just add to them
  if (prevRants[0]) {
    return ([[...prevRants[0], ...column0], [...prevRants[1], ...column1]]);
  }
  // If there isn't, this means it's the first time. No need to add anything
  return ([column0, column1]);
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
