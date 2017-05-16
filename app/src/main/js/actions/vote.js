import rantscript from '../consts/rantscript';
import { ITEM } from '../consts/types';
import showToast from './toast';


const voteRant = (voteState = 1, rantID) => (dispatch, getState) => {
  const { user } = getState().auth;
  let authToken = null;
  if (user) {
    authToken = user.authToken;
  } else {
    showToast(dispatch, 'Are you logged in?');
  }
  rantscript
      .vote(voteState, rantID, authToken)
      .then(() => {
      })
      .catch(() => {
        showToast(dispatch, 'Username or Password is wrong');
      });
};

const vote = (voteState = 1, id, type) => {
  switch (type) {
    case ITEM.RANT.NAME:
      return voteRant(voteState, id);
    default:
      return voteRant(voteState, id);
  }
};

export { vote as default };
