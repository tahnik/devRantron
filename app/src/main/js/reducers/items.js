import { FEED, STATE } from '../consts/types';
import DEFAULT_STATES from '../consts/default_states';

export default (state = DEFAULT_STATES.ITEM, action) => {
  switch (action.type) {
    case FEED.ITEM.ACTION.GET:
      switch (action.itemType) {
        case FEED.ITEM.TYPE.RANT:
          switch (action.state) {
            case STATE.SUCCESS:
              return [
                ...state, {
                  itemType: FEED.ITEM.TYPE.RANT,
                  item: action.item,
                  id: action.id,
                },
              ];
            default:
              return state;
          }
        default:
          return state;
      }
    default:
      return state;
  }
};
