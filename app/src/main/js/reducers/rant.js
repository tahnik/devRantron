import { FETCH_RANT, CLOSE_RANT, COMMENT_POST } from '../consts/rants';
import STATE from '../consts/state';

const DEFAULT_STATE = {
  rant: null,
  state: STATE.SUCCESS,
  /*
  * If you are wondering why the commentPost text
  * and state is not in an object, it was having problem with
  * updating the state and rendering the UI when they were in an object
  */
  commentPostText: '',
  commentPostState: STATE.INITIAL,
  commentUsers: [],
};


export default function rant(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case FETCH_RANT:
      switch (action.state) {
        case STATE.LOADING: {
          return {
            ...state,
            state: action.state,
            rant: null,
          };
        }
        case STATE.SUCCESS: {
          return {
            ...state,
            state: action.state,
            rant: action.payload,
          };
        }
        case STATE.FAILED: {
          return { ...state, state: action.state, rant: null };
        }
        default: {
          return { ...state, state: action.state, rant: null };
        }
      }
    case CLOSE_RANT: {
      return { rant: null, state: STATE.SUCCESS, commentPost: '' };
    }
    case COMMENT_POST.Post: {
      if (action.state === STATE.LOADING) {
        return { ...state, commentPostState: STATE.LOADING };
      } else if (action.state === STATE.SUCCESS) {
        return {
          ...state,
          commentPostText: action.payload,
          commentPostState: STATE.SUCCESS,
        };
      }
      return { ...state, commentPostState: STATE.FAILED };
    }
    case COMMENT_POST.UPDATE: {
      return { ...state, commentPostText: action.payload };
    }
    case COMMENT_POST.ADD_USER: {
      return { ...state, commentPostText: `${state.commentPost} @${action.user} ` };
    }
    case COMMENT_POST.CLEAR: {
      return { ...state, commentPostText: '' };
    }
    default: {
      return state;
    }
  }
}
