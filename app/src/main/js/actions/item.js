import { ITEM } from '../consts/types';

const close = id => (dispatch) => {
  dispatch({
    type: ITEM.COMMON.ACTION.CLOSE,
    id,
  });
};

export default close;
