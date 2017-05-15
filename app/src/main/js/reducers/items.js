import { ITEM, STATE } from '../consts/types';
import DEFAULT_STATES from '../consts/default_states';

export default (state = DEFAULT_STATES.ITEM, action) => {
  switch (action.type) {
    case ITEM.RANT.ACTION.FETCH:
      switch (action.state) {
        case STATE.SUCCESS: {
          const newItems = state.slice();
          const prevItem = state.filter(item => (item.id === action.id))[0];
          const index = newItems.indexOf(prevItem);
          newItems[index].item = action.item;
          newItems[index].state = STATE.SUCCESS;
          return newItems;
        }
        case STATE.LOADING:
          return [
            ...state, {
              itemType: ITEM.RANT.NAME,
              id: action.id,
              state: STATE.LOADING,
            },
          ];
        default:
          return state;
      }
    case ITEM.COMMON.ACTION.CLOSE: {
      return state.filter(item => (item.id !== action.id));
    }
    default:
      return state;
  }
};
