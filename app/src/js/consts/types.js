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

export const SEARCH = {
  ADDTOFREQ: 'SEARCH_ADD_TO_FREQ',
};

export const NOTIF_TYPES = {
  CONTENT_VOTE: 'content_vote',
  RANT_SUB: 'rant_sub',
  COMMENT: {
    DISCUSS: 'comment_discuss',
    MENTION: 'comment_mention',
    CONTENT: 'comment_content',
    VOTE: 'comment_vote',
  },
};

export const SEARCH_FILTERS = {
  SORT: {
    RECENT: 'recent',
  },
  PRIMARY: 'SORT',
};

export const SETTINGS = {
  TYPE: {
    DROPDOWN: 'DROPDOWN',
    TOGGLE: 'TOGGLE',
    TEXT: 'TEXT',
    BUTTON: 'BUTTON',
    SLIDER: 'SLIDER',
  },
  ACTION: {
    CHANGE_GENERAL: 'CHANGE_GENERAL',
    CHANGE_THEME: 'CHANGE_THEME',
  },
};

export const THEMES = {
  DARK_THEME: {
    name: 'Dark Theme',
    id: 'dark_theme',
    backgroundColor: '#54556E',
    item_card: {
      backgroundColor: '#40415A',
      color: '#FFFFFF',
    },
    comment_card: {
      backgroundColor: '#40415A',
      color: '#FFFFFF',
    },
    column: {
      backgroundColor: '#54556E',
      width: '450',
    },
    user_badge: {
      details_back: '#54556E',
    },
    plus_notif: {
      backgroundColor: '#D55161',
    },
  },
  BLACK_THEME: {
    name: 'Black Theme',
    id: 'white_theme',
    backgroundColor: '#000000',
    item_card: {
      backgroundColor: '#111111',
      color: '#FFFFFF',
    },
    comment_card: {
      backgroundColor: '#111111',
      color: '#FFFFFF',
    },
    column: {
      backgroundColor: '#54556E',
      width: '450',
    },
    user_badge: {
      details_back: '#54556E',
    },
    plus_notif: {
      backgroundColor: '#FFFFFF',
    },
  },
  WHITE_THEME: {
    name: 'White Theme',
    id: 'white_theme',
    backgroundColor: '#F5F5F5',
    item_card: {
      backgroundColor: '#FFFFFF',
      color: '#000000',
    },
    comment_card: {
      backgroundColor: '#FFFFFF',
      color: '#00000',
    },
    column: {
      backgroundColor: '#54556E',
      width: '450',
    },
    user_badge: {
      details_back: '#54556E',
    },
    plus_notif: {
      backgroundColor: '#000000',
    },
  },
  SOLARIZED_LIGHT: {
    name: 'Solarized Light',
    id: 'solarized_light',
    backgroundColor: '#fdf6e3',
    item_card: {
      backgroundColor: '#93a1a1',
      color: '#073642',
    },
    comment_card: {
      backgroundColor: '#93a1a1',
      color: '#073642',
    },
    column: {
      backgroundColor: '#54556E',
      width: '450',
    },
    user_badge: {
      details_back: '#54556E',
    },
    plus_notif: {
      backgroundColor: '#D55161',
    },
  },
  SOLARIZED_DARK: {
    name: 'Solarized Dark',
    id: 'solarized_dark',
    backgroundColor: '#002b36',
    item_card: {
      backgroundColor: '#586e75',
      color: '#fdf6e3',
    },
    comment_card: {
      backgroundColor: '#586e75',
      color: '#fdf6e3',
    },
    column: {
      backgroundColor: '#54556E',
      width: '450',
    },
    user_badge: {
      details_back: '#54556E',
    },
    plus_notif: {
      backgroundColor: '#dc322f',
    },
  },
  MONOKAI: {
    name: 'Monokai',
    id: 'monokai',
    backgroundColor: '#22231e',
    item_card: {
      backgroundColor: '#272822',
      color: '#fdf6e3',
    },
    comment_card: {
      backgroundColor: '#586e75',
      color: '#fdf6e3',
    },
    column: {
      backgroundColor: '#54556E',
      width: '450',
    },
    user_badge: {
      details_back: '#54556E',
    },
    plus_notif: {
      backgroundColor: '#f92672',
    },
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

export const POST_RANT = {
  ADD_DRAFT: 'POST_RANT_ADD_DRAFT',
  REMOVE_DRAFT: 'POST_RANT_REMOVE_DRAFT',
  AUTOSAVE: {
    SAVE: 'AUTOSAVE_SAVE',
    CLEAR: 'AUTOSAVE_CLEAR',
  },
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
  UPDATE_SCROLL: 'COLUMN_UPDATE_SCROLL',
};

export const ITEM = {
  RANT: {
    NAME: 'RANT',
    ACTION: {
      FETCH: 'RANT_FETCH',
      VOTE: 'RANT_VOTE',
    },
  },
  RELEASE_INFO: {
    NAME: 'RELEASE_INFO',
  },
  PROFILE: {
    NAME: 'PROFILE',
    ACTION: {
      FETCH: 'PROFILE_FETCH',
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
  WEEKLY: {
    NAME: 'WEEKLY',
    ACTION: {
      VOTE: 'WEEKLY_VOTE',
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
  WEEKLY: {
    NAME: 'WEEKLY',
    FILTERS: {
      SORT: {
        ALGO: 'algo',
        TOP: 'top',
        RECENT: 'recent',
      },
      PRIMARY: 'SORT',
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
