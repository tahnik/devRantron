import { MODAL } from '../consts/types';

/**
 * Opens the modal. It can contain rant or collab
 *
 * @param {string} type Type of the item to show in the modal
 * @param {number} id This ID can be either user id or rant/collab id
 */
const openModal = (type, id) => (dispatch) => {
  dispatch({
    type: MODAL.OPEN,
    item: {
      type,
      id,
    },
  });
};

/**
 * Closes the modal.
 *
 */
const closeModal = () => (dispatch) => {
  dispatch({
    type: MODAL.OPEN,
    item: null,
  });
};

export { openModal, closeModal };
