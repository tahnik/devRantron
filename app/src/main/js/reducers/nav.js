import NAV from '../consts/nav';

function TopNavItems(state = [], action) {
    switch (action.type) {
        case NAV.TYPE.TABBED: 
            return action.items;
        
        case NAV.TYPE.BLANK: 
            return [];
        
        case NAV.TYPE.NONE:
            return null;

        default: {
            return state;
        }
    }
}

function CurrentItem(state = '', action) {
    switch (action.type) {
        case NAV.ITEM:
            return action.item;
        default:
            return state;
    }
}

export function TopNav (state = {}, action) {
    switch (action.type) {
        case NAV.TYPE.BLANK:
        case NAV.TYPE.NONE:
        case NAV.TYPE.TABBED:
            return {
                selectedItem: state.selectedItem,
                items: TopNavItems(state.items, action)
            }
        case NAV.ITEM:
            return {
                selectedItem: CurrentItem(state.selectedItem, action),
                items: state.items
            }
        default:
            return state
    }
}