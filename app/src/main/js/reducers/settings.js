import {
  CHANGE_THEME,
  THEME_TYPE,
  CHANGE_NOLOGIN,
} from '../consts/settings';

const INITIAL_STATE = {
  noLogin: false,
  currentTheme: THEME_TYPE.DARK_THEME,
};

export default function theme(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CHANGE_THEME:
      return { ...state, currentTheme: action.payload };
    case CHANGE_NOLOGIN: {
      const newState = { ...state, noLogin: action.payload };
      localStorage.setItem('settings', JSON.stringify(newState));
      return newState;
    }
    default:
      return state;
  }
}
