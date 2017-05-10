import { CHANGE_THEME, CHANGE_NOLOGIN } from '../consts/settings';
import STATE from '../consts/state';

export function changeStyle(themeType) {
  document.querySelector('body').className = themeType;
  return (dispatch) => {
    dispatch({ type: CHANGE_THEME, state: STATE.SUCCESS, payload: themeType });
  };
}

export function changeNoLogin(bool) {
  return {
    type: CHANGE_NOLOGIN,
    // just making sure it's not a random value
    payload: !!bool,
  };
}
