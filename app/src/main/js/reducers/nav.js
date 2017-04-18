import NAV from '../consts/nav';

export function TopNavItems(state = [], action) {
    switch (action.type) {
        case NAV.TABBED: {
            return action.items;
        }
        case NAV.BLANK: {
            return [];
        }
        default: {
            return state;
        }
    }
}
