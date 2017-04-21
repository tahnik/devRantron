import { COMMENT_POST } from '../consts/rants';
import STATE from '../consts/state';

const DEFAULT_STATE = {
  text: '',
  state: STATE.INITIAL,
};


export default function rant(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case COMMENT_POST.UPDATE:
      return { ...state, text: action.payload };
    case COMMENT_POST.CLEAR:
      return { text: '', state: STATE.INITIAL };
    case COMMENT_POST.ADD_USER:
      return { ...state, text: `${state.text} @${action.user} ` };
    case COMMENT_POST.POST:
      switch (action.state) {
        case STATE.LOADING:
          return { ...state, state: STATE.LOADING };
        case STATE.FAILED:
          return { ...state, state: STATE.FAILED };
        case STATE.SUCCESS:
          return { text: '', state: STATE.SUCCESS };
        default:
          return { ...state, state: STATE.FAILED };
      }
    default: {
      return state;
    }
  }
}
