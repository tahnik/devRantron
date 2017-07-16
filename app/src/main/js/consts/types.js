export const AUTH = {
  LOGIN: 'AUTH_LOGIN',
  NOLOGIN: 'AUTH_NOLOGIN',
  LOGOUT: 'AUTH_LOGOUT',
};
export const NOTIFS = {
  FETCH: 'NOTIF_FETCH',
  CLEARALL: 'NOTIF_CLEARALL',
  CLEAR: 'NOTIF_CLEAR',
};

export const NOTIF_TYPES = {

};

export const SETTINGS = {
  TYPE: {
    DROPDOWN: 'DROPDOWN',
    TOGGLE: 'TOGGLE',
    TEXT: 'TEXT',
    BUTTON: 'BUTTON',
  },
  ACTION: {
    CHANGE_GENERAL: 'CHANGE_GENERAL',
  },
};

export const STATE = {
  INITIAL: 'STATE_INITIAL',
  SUCCESS: 'STATE_SUCCESS',
  FAILED: 'STATE_FAILED',
  LOADING: 'STATE_LOADING',
};

export const TOAST = {
  SHOW: 'TOAST_SHOW',
  HIDE: 'TOAST_HIDE',
};

export const MODAL = {
  OPEN: 'MODAL_OPEN',
  CLOSE: 'MODAL_CLOSE',
};

export const USER = {
  FETCH: 'USER_FETCH',
  REMOVE: 'USER_REMOVE',
};

export const COLUMNS = {
  RESET: 'COLUMNS_RESET',
  ADD: 'COLUMNS_ADD',
  REMOVE: 'COLUMNS_REMOVE',
};

export const COLUMN = {
  FETCH: 'COLUMN_FETCH',
  RESET: 'COLUMN_RESET',
};

export const ITEM = {
  RANT: {
    NAME: 'RANT',
    ACTION: {
      FETCH: 'RANT_FETCH',
      VOTE: 'RANT_VOTE',
    },
  },
  POST_RANT: {
    NAME: 'POST_RANT',
    ACTION: {
      POST_RANT: 'POST_RANT',
    },
  },
  COMMENT: {
    NAME: 'COMMENT',
    ACTION: {
      VOTE: 'RANT_VOTE',
    },
  },
  STORIES: {
    NAME: 'STORIES',
    ACTION: {
      VOTE: 'RANT_VOTE',
    },
  },
  COLLAB: {
    NAME: 'COLLAB',
    ACTION: {
      VOTE: 'COLLAB_VOTE',
    },
  },
  COMMON: {
    ACTION: {
      CLOSE: 'ITEM_CLOSE',
    },
  },
};

export const FILTERS = {
  SORT: 'SORT',
  RANGE: 'RANGE',
};

export const FEED = {
  RANTS: {
    NAME: 'RANTS',
    FILTERS: {
      RANGE: {
        DAY: 'day',
        WEEK: 'week',
        MONTH: 'month',
        ALL: 'all',
      },
      SORT: {
        ALGO: 'algo',
        TOP: 'top',
        RECENT: 'recent',
      },
      PRIMARY: 'SORT',
      SECONDARY: 'RANGE',
      HAS_SECONDARY: {
        TOP: true,
        ALGO: false,
        RECENT: false,
      },
    },
  },
  STORIES: {
    NAME: 'STORIES',
    FILTERS: {
      RANGE: {
        DAY: 'day',
        WEEK: 'week',
        MONTH: 'month',
        ALL: 'all',
      },
      SORT: {
        TOP: 'top',
        RECENT: 'recent',
      },
      PRIMARY: 'RANGE',
      SECONDARY: 'SORT',
      HAS_SECONDARY: {
        DAY: true,
        WEEK: true,
        MONTH: true,
        ALL: true,
      },
    },
  },
  COLLABS: {
    NAME: 'COLLABS',
    FILTERS: {
      SORT: {
        RECENT: 'recent',
      },
      PRIMARY: 'SORT',
    },
  },
};
