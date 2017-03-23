import {
  THEME_TYPE,
  CHANGE_THEME,
} from '../consts/styles';


export default function (state = THEME_TYPE.DARK_THEME, action) {
  if (action.type === CHANGE_THEME) {
    switch (action.themeType) {
      case THEME_TYPE.DARK_THEME:
        return action.themeType;
      case THEME_TYPE.LIGHT_THEME:
        return action.themeType;
    }
  }
  return state;
}
