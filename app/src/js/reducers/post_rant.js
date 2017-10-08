import DEFAULT_STATES from '../consts/default_states';
import { POST_RANT } from '../consts/types';

export default (state = DEFAULT_STATES.postRant, action) => {
  switch (action.type) {
    case POST_RANT.ADD_DRAFT: {
      const prevDrafts = state.drafts;
      const prevDraft = prevDrafts.filter(draft => draft.name === action.draft.name);
      if (prevDraft.length !== 0) {
        const index = prevDrafts.indexOf(prevDraft[0]);
        const newDrafts = [...prevDrafts];
        newDrafts[index] = {
          name: prevDraft[0].name,
          rant: action.draft.rant,
        };
        return {
          ...state,
          drafts: newDrafts,
        };
      }
      return {
        ...state,
        drafts: [...state.drafts, { name: action.draft.name, rant: action.draft.rant }],
      };
    }
    case POST_RANT.REMOVE_DRAFT: {
      const currentDrafts = [...state.drafts];
      const drafts = currentDrafts.filter(draft => draft.name !== action.name);
      return {
        ...state,
        drafts,
      };
    }
    case POST_RANT.AUTOSAVE.SAVE:
      return { ...state, autoSave: action.rant };
    case POST_RANT.AUTOSAVE.CLEAR:
      return { ...state, autoSave: '' };
    default:
      return state;
  }
};
