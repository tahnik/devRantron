import { 
	DARK_THEME, 
	LIGHT_THEME, 
	CHANGE_THEME 
} from '../actions/style_actions';

export const DARK_THEME_FILE = 'dark_theme';
export const LIGHT_THEME_FILE = 'light_theme';

export default function(state = DARK_THEME_FILE, action) {
	if(action.type == CHANGE_THEME) {
			switch(action.theme) {
				case DARK_THEME:
					return DARK_THEME_FILE;
				case LIGHT_THEME:
					return LIGHT_THEME_FILE;
			}
	}
	return state;
}
