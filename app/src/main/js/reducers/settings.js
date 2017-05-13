import DEFAULT_STATES from '../consts/default_states';

export default (state = DEFAULT_STATES.SETTINGS, action) => {
  switch (action.type) {
    case 'CHANGE_BACKGROUND': {
      return { ...state, theme: { backgroundColor: action.color } };
    }
    default:
      return state;
  }
};
