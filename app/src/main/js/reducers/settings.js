import { CHANGE_THEME, THEME_TYPE } from '../consts/settings';

export default function theme(state = THEME_TYPE.DARK_THEME, action) {
  if (action.type === CHANGE_THEME) {
    return action.payload;
  }
  return state;
}
