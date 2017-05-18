export const AUTH = {
  LOGIN: 'AUTH_LOGIN',
  NOLOGIN: 'AUTH_NOLOGIN',
  LOGOUT: 'AUTH_LOGOUT',
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

export const USER = {
  FETCH: 'USER_FETCH',
  REMOVE: 'USER_REMOVE',
};

export const ITEM = {
  RANT: {
    NAME: 'RANT',
    ACTION: {
      FETCH: 'RANT_FETCH',
      VOTE: 'RANT_VOTE',
    },
  },
  COMMENT: {
    NAME: 'COMMENT',
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
  ACTION: {
    FETCH: 'FEED_FETCH',
    RESET: 'FEED_RESET',
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
