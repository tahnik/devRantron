import { POST_RANT } from '../consts/types';
import { saveUserState } from './settings';


/**
 * Adds a draft to the current list of drafts
 *
 * @param {object} draft The object containing the draft content and unique ID
 */
const addDraft = draft => (dispatch) => {
  dispatch({
    type: POST_RANT.ADD_DRAFT,
    draft,
  });
};

/**
 * Remove a draft from the list of drafts
 *
 * @param {string} name Unique id of the draft
 */
const removeDraft = name => (dispatch) => {
  dispatch({
    type: POST_RANT.REMOVE_DRAFT,
    name,
  });
};

/**
 * Saves a rant when closing the window without posting
 *
 * @param {string} content
 */
const saveAutoSave = rant => (dispatch) => {
  setTimeout(() => {
    dispatch(saveUserState());
  }, 1000);
  dispatch({
    type: POST_RANT.AUTOSAVE.SAVE,
    rant,
  });
};

/**
 * Clears autosave
 *
 */
const clearAutoSave = () => (dispatch) => {
  dispatch({
    type: POST_RANT.AUTOSAVE.CLEAR,
  });
};

export { addDraft, removeDraft, saveAutoSave, clearAutoSave };
