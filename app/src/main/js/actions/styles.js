import { CHANGE_THEME } from '../consts/styles';

export default function changeStyle(themeType) {
  return {
    type: CHANGE_THEME,
    themeType,
  };
}
