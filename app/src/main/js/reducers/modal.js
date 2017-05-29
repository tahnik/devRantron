import DEFAULT_STATES from '../consts/default_states';
import { MODAL } from '../consts/types';

export default (state = DEFAULT_STATES.MODAL, action) => {
  switch (action.type) {
    case MODAL.OPEN:
      return { item: action.item };
    case MODAL.CLOSE:
      return { item: null };
    default:
      return state;
  }
};
