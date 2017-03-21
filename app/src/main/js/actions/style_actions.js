export const DARK_THEME = 'DARK_THEME';
export const LIGHT_THEME = 'LIGHT_THEME';
export const CHANGE_THEME = 'CHANGE_THEME';

export function changeStyle(theme) {
	return {
		type: CHANGE_THEME,
		theme: theme
	}
}