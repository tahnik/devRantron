import DEFAULT_STATES from '../consts/default_states';

export default (state = DEFAULT_STATES.AUTH, action) => {
  switch (action.type) {
    case 'AUTH_LOGIN': {
      switch (action.state) {
        case 'STATE_SUCCESS':
          return { ...state, user: action.user, state: 'STATE_SUCCESS' };
        case 'STATE_FAILED':
          return { ...state, user: null, state: 'STATE_FAILED' };
        case 'STATE_LOADING':
          return { ...state, user: null, state: 'STATE_LOADING' };
        default:
          return state;
      }
    }
    default:
      return state;
  }
};
