import DEFAULT_STATE from '../consts/default_states';
import { TOAST } from '../consts/types';

export default (state = DEFAULT_STATE.TOAST, action) => {
  switch (action.type) {
    case TOAST.SHOW:
      return { ...state, text: action.text, isVisible: true };
    case TOAST.HIDE:
      return { ...state, isVisible: false };
    default:
      return state;
  }
};
