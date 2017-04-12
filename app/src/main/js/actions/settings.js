import { CHANGE_THEME } from '../consts/settings';
import STATE from '../consts/state';

export default function changeStyle(themeType) {
  document.querySelector('body').className = themeType;
  return (dispatch) => {
    dispatch({ type: CHANGE_THEME, state: STATE.SUCCESS, payload: themeType });
  };
}
