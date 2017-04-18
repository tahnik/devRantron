import NAV from '../consts/nav';

export const tabbedNav = (items) => ({
    type: NAV.TABBED,
    items
})

export const blankNav = () => ({
    type: NAV.BLANK
})