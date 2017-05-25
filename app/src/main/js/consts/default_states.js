import { STATE, FEED } from './types';
import { getUID } from './DOMFunctions';

/*
 * Why not export them separately?
 * We have other variables called AUTH or SETTINGS.
 * It is easy to understand if we import DEFAULT_STATES in some file
 * and use it like DEFAULT_STATES.AUTH.
 */

export default {
  AUTH: {
    user: null,
    state: STATE.INITIAL,
    noLogin: false,
  },
  SETTINGS: {
    theme: {
      name: 'Dark Theme',
      backgroundColor: '#54556E',
      item_card: {
        backgroundColor: '#40415A',
        color: 'white',
      },
      comment_card: {
        backgroundColor: '#40415A',
        color: 'white',
      },
      column: {
        backgroundColor: '#54556E',
        width: '450',
      },
      user_badge: {
        details_back: '#54556E',
      },
    },
  },
  TOAST: {
    text: '',
    isVisible: false,
  },
  RANTS: {
    state: STATE.INITIAL,
    page: 0,
    items: [],
  },
  WEEKLY: {
    state: STATE.INITIAL,
    page: 0,
    items: [],
  },
  COLUMNS: [],
  COLUMN: {
    id: getUID(),
    items: [],
    page: 0,
    type: FEED.RANTS.NAME,
    prev_set: 0,
  },
  ITEM: [

  ],
  USER: {
    state: STATE.INITIAL,
    profile: null,
  },
  MODAL: {
    item: null,
  },
};
