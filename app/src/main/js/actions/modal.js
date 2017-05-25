import { MODAL } from '../consts/types';

const openModal = (type, id) => (dispatch) => {
  dispatch({
    type: MODAL.OPEN,
    item: {
      type,
      id,
    },
  });
};

const closeModal = () => (dispatch) => {
  dispatch({
    type: MODAL.OPEN,
    item: null,
  });
};

export { openModal, closeModal };
