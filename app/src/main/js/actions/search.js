import { SEARCH } from '../consts/types';

/**
 * Adds a string to frequently searched terms
 * @param {string} term term to add
 */
// eslint-disable-next-line
export const addToFreqTerms = term => (dispatch) => {
  dispatch({
    type: SEARCH.ADDTOFREQ,
    term,
  });
};
