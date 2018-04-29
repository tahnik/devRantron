import { STATE, FEED, SETTINGS, THEMES } from './types';
import { getUID } from './utils';

/*
 * Why not export them separately?
 * We have other variables called AUTH or SETTINGS.
 * It is easy to understand if we import DEFAULT_STATES in some file
 * and use it like DEFAULT_STATES.AUTH.
 */

export default {
  auth: {
    user: null,
    state: STATE.INITIAL,
    noLogin: false,
  },
  notifs: null,
  settings: {
    theme: THEMES.DARK_THEME,
    general: {
      filterRants: {
        title: 'Filter Rants',
        options: {
          filter_enabled: {
            type: SETTINGS.TYPE.TOGGLE,
            text: 'Enabled',
            value: true,
          },
          rant_content: {
            type: SETTINGS.TYPE.TEXT,
            text: 'Rants containing these texts (Comma Separated)',
            placeholder: 'i.e. !rant',
            value: '',
          },
          tags: {
            type: SETTINGS.TYPE.TEXT,
            text: 'Rants containing these tags (Comma Separated)',
            placeholder: 'i.e. windows',
            value: '',
          },
        },
      },
      notifications: {
        title: 'Notifications',
        options: {
          notif_enabled: {
            type: SETTINGS.TYPE.TOGGLE,
            text: 'Enabled',
            value: true,
          },
          notif_sound_enabled: {
            type: SETTINGS.TYPE.TOGGLE,
            text: 'Play sound',
            value: true,
          },
          quick_reply_enabled: {
            type: SETTINGS.TYPE.TOGGLE,
            text: 'Enable "Quick Reply" when someone @mentions',
            value: false,
          },
          content_vote: {
            type: SETTINGS.TYPE.TOGGLE,
            text: 'New +1\'s on your rants',
            value: true,
          },
          comment_vote: {
            type: SETTINGS.TYPE.TOGGLE,
            text: 'New +1\'s on your comments',
            value: true,
          },
          comment_content: {
            type: SETTINGS.TYPE.TOGGLE,
            text: 'New comments on your rants',
            value: true,
          },
          comment_discuss: {
            type: SETTINGS.TYPE.TOGGLE,
            text: 'New comments on rants you have commented on',
            value: true,
          },
          comment_mention: {
            type: SETTINGS.TYPE.TOGGLE,
            text: 'Someone @mentions you',
            value: true,
          },
          rant_sub: {
            type: SETTINGS.TYPE.TOGGLE,
            text: 'New rants from users you subscribe to',
            value: true,
          },
        },
      },
      autoLaunch: {
        text: 'Auto launch after boot',
        type: SETTINGS.TYPE.TOGGLE,
        value: false,
      },
      minimiseOnClose: {
        text: 'Minimise app on close',
        type: SETTINGS.TYPE.TOGGLE,
        value: false,
      },
      zoomLevel: {
        text: 'Zoom level',
        type: SETTINGS.TYPE.SLIDER,
        value: 0,
      },
      update: {
        text: 'Update Status',
        type: SETTINGS.TYPE.BUTTON,
        buttonText: 'Up to date',
        value: false,
      },
      reset_cache: {
        text: 'Reset application cache (This will log you out)',
        type: SETTINGS.TYPE.BUTTON,
        buttonText: 'Reset',
        value: true,
      },
    },
  },
  toast: {
    text: '',
    isVisible: false,
  },
  columns: [],
  column: {
    id: getUID(),
    items: [],
    page: 0,
    type: FEED.RANTS.NAME,
    prev_set: 0,
    state: STATE.INITIAL,
  },
  search: [],
  user: {
    state: STATE.INITIAL,
    profile: null,
  },
  modal: {
    item: null,
  },
  postRant: {
    autoSave: { content: '', tags: '' },
    drafts: [],
  },
};
