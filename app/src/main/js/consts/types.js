export const AUTH = {
  LOGIN: 'AUTH_LOGIN',
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

export const FEED = {
  RANTS: {
    ACTION: {
      FETCH: 'FEED_RANTS_FETCH',
    },
    NAME: 'RANTS',
    FILTERS: {
      SORT: {
        ALGO: 'algo',
        TOP: 'top',
        RECENT: 'recent',
      },
    },
  },
  RANT: {
    ACTION: {
      VOTE: 'RANT_VOTE',
    },
  },
};
