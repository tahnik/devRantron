import DEFAULT_STATE from '../consts/default_states';

export default (state = DEFAULT_STATE.TOAST, action) => {
  switch (action.type) {
    case 'TOAST_SHOW':
      return { ...state, text: action.text, isVisible: true };
    case 'TOAST_HIDE':
      return { ...state, isVisible: false };
    default:
      return state;
  }
};
