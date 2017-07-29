import { NOTIF_TYPES } from '../consts/types';


const getRandomInt = () => Math.floor(Math.random() * ((3000 - 0) + 1));

const getUID = () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    let r = Math.random() * 16 | 0, //eslint-disable-line
      v = c == 'x' ? r : (r & 0x3 | 0x8); //eslint-disable-line
  return v.toString(16);
});

// eslint-disable-next-line
const escapeRegExp = str => str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");

const getNotifText = (type, username) => {
  switch (type) {
    case NOTIF_TYPES.COMMENT.MENTION:
      return `${username} mentioned you in a comment.`;
    case NOTIF_TYPES.COMMENT.CONTENT:
      return `${username} commented on your rant.`;
    case NOTIF_TYPES.COMMENT.DISCUSS:
      return 'New comments on a rant you follow.';
    case NOTIF_TYPES.COMMENT.VOTE:
      return `${username} +1'd your comment.`;
    case NOTIF_TYPES.RANT_SUB:
      return `${username} posted a new rant`;
    default:
      return `${username} +1'd your rant.`;
  }
};

export { getRandomInt, getUID, getNotifText, escapeRegExp };
