import { NOTIF_TYPES } from '../consts/types';
import EmojiData from './emojis.json';

const Autolinker = require('autolinker');


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

const getAllEmojis = () => {
  const emojis = {};
  Object.keys(EmojiData).forEach((key) => {
    EmojiData[key].forEach((emoji) => {
      emojis[emoji.name] = emoji.icon;
    });
  });
  return emojis;
};

const parseLinks = text => Autolinker.link(text);

const getEmojisFromText = (content, index, emojis) => {
  const modifiableContent = content;
  const firstIndex = modifiableContent.indexOf(':', index);
  const nextIndex = modifiableContent.indexOf(':', firstIndex + 1);
  const stringInBetween = content.substring(firstIndex, nextIndex + 1);
  const regSpace = /[ \n\r]+/g;
  if (nextIndex === -1 || firstIndex === -1) {
    return;
  }
  if (regSpace.test(stringInBetween) || stringInBetween === '::') {
    getEmojisFromText(content, nextIndex, emojis);
  } else {
    emojis.add(stringInBetween);
    getEmojisFromText(content, nextIndex + 1, emojis);
  }
};

export {
  getRandomInt,
  getUID,
  getNotifText,
  escapeRegExp,
  getAllEmojis,
  getEmojisFromText,
  parseLinks,
};
