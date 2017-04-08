import { COMMENT_POST } from '../consts/comments';

const DEFAULT_STATE = {
  commentPost: '',
};

export function comments(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case COMMENT_POST.UPDATE:
      return { commentPost: action.payload };
    case COMMENT_POST.ADD_USER:
      return { commentPost: `${state.commentPost} @${action.user} ` };
    case COMMENT_POST.CLEAR:
      return { commentPost: '' };
  }
  return state;
}
