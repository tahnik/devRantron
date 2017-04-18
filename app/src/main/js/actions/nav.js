import NAV from '../consts/nav';

export const tabbedNav = (items) => ({
    type: NAV.TYPE.TABBED,
    items
});

export const blankNav = () => ({
    type: NAV.TYPE.BLANK
});

export const tabItem = (i) => ({
    type: NAV.ITEM,
    item: i
})