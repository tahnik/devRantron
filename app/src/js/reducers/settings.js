import DEFAULT_STATES from '../consts/default_states';
import { SETTINGS, THEMES } from '../consts/types';

export default (state = DEFAULT_STATES.settings, action) => {
  switch (action.type) {
    case SETTINGS.ACTION.CHANGE_GENERAL: {
      const { primaryKey, secondaryKey } = action;
      const general = { ...state.general };
      if (secondaryKey) {
        const options = general[primaryKey].options;
        options[secondaryKey].value = action.value;
      } else {
        general[primaryKey].value = action.value;
        if (action.buttonText) {
          general[primaryKey].buttonText = action.buttonText;
        }
      }
      return {
        ...state,
        general,
      };
    }
    case SETTINGS.ACTION.CHANGE_THEME: {
      const { key, values } = action;
      let theme = { ...state.general };
      theme = THEMES[key];
      return {
        ...state,
        theme,
      };
    }
    default:
      return state;
  }
};
