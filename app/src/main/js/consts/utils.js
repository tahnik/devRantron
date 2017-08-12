import Autolinker from 'autolinker';
import { NOTIF_TYPES } from '../consts/types';
import EmojiData from './emojis.json';


export const getRandomInt = () => Math.floor(Math.random() * ((3000 - 0) + 1));

export const getUID = () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    let r = Math.random() * 16 | 0, //eslint-disable-line
      v = c == 'x' ? r : (r & 0x3 | 0x8); //eslint-disable-line
  return v.toString(16);
});

// eslint-disable-next-line
export const escapeRegExp = str => str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");

export const getNotifText = (type, username) => {
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

export const getAllEmojis = () => {
  const emojis = {};
  Object.keys(EmojiData).forEach((key) => {
    EmojiData[key].forEach((emoji) => {
      emojis[emoji.name] = emoji.icon;
    });
  });
  return emojis;
};

export const parseLinks = (text, item = null) => {
  let returnText = text;
  if (item && item.links) {
    item.links.forEach((link) => {
      returnText = returnText.replace(link.short_url, link.url);
    });
  }
  return Autolinker.link(returnText, { truncate: { length: 32 } });
};

export const getEmojisFromText = (content, index, emojis) => {
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

export const timeSince = (date) => {
  const seconds = Math.floor((new Date() - date) / 1000);
  let interval = seconds / 2592000;
  if (interval > 1) {
    const nd = new Date(date);
    return `${nd.getDate()}/${nd.getMonth()}/${nd.getYear().toString().substring(1)}`;
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return `${Math.floor(interval)}d`;
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return `${Math.floor(interval)}h`;
  }
  interval = seconds / 60;
  if (interval > 1) {
    return `${Math.floor(interval)}m`;
  }
  return `${Math.floor(seconds)}s`;
};


//eslint-disable-next-line
export const parseUsers = (text) => {
  return text.replace(
    /@(\S+)/ig,
    '<a href="http://devrant.io/users/$1">@$1</a>',
  );
};
