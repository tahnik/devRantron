import Autolinker from 'autolinker';
import createDOMPurify from 'dompurify';
import Twemoji from 'twemoji';
import { NOTIF_TYPES } from '../consts/types';
import EmojiData from './emojis.json';

const DOMPurify = createDOMPurify(window);


export const getRandomInt = () => Math.floor(Math.random() * ((3000 - 0) + 1));

export const getUID = () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    let r = Math.random() * 16 | 0, //eslint-disable-line
      v = c == 'x' ? r : (r & 0x3 | 0x8); //eslint-disable-line
  return v.toString(16);
});

// eslint-disable-next-line
export const escapeRegExp = str => str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");

export const getNotifText = (type, username, isCollab = false) => {
  switch (type) {
    case NOTIF_TYPES.COMMENT.MENTION:
      return `${username} mentioned you in a comment.`;
    case NOTIF_TYPES.COMMENT.CONTENT:
      return `${username} commented on your ${isCollab ? 'collab' : 'rant'}.`;
    case NOTIF_TYPES.COMMENT.DISCUSS:
      return `New comments on a ${isCollab ? 'collab' : 'rant'} you follow.`;
    case NOTIF_TYPES.COMMENT.VOTE:
      return `${username} +1'd your comment.`;
    case NOTIF_TYPES.RANT_SUB:
      return `${username} posted a new ${isCollab ? 'collab' : 'rant'}.`;
    default:
      return `${username} +1'd your ${isCollab ? 'collab' : 'rant'}.`;
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

export const getAllEmojisRev = () => {
  const emojis = {};
  Object.keys(EmojiData).forEach((key) => {
    EmojiData[key].forEach((emoji) => {
      emojis[emoji.icon] = emoji.name;
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

export const getTextFromEmoji = (content) => {
  let contentToParse = content;
  const allEmojis = getAllEmojisRev();
  Twemoji.replace(content, (emoji) => {
    const unicodeEmoji = allEmojis[emoji];
    if (unicodeEmoji) {
      const regex = new RegExp(emoji, 'g');
      contentToParse = contentToParse.replace(regex, `:${unicodeEmoji}:`);
    }
  });
  return contentToParse;
};

export const timeSince = (date) => {
  const seconds = Math.floor((new Date() - date) / 1000);
  let interval = seconds / 2592000;
  if (interval > 1) {
    return new Date(date).toLocaleDateString('en-GB', { year: '2-digit', month: 'numeric', day: 'numeric' });
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


// eslint-disable-next-line
export const parseUsers = (text) => {
  return text.replace(
    /@(\w+[-]*\w*)/ig,
    '<a href="http://devrant.io/users/$1">@$1</a>',
  );
};

export const replaceAll = (target, search, replacement) => target.replace(new RegExp(search, 'g'), replacement);

export const purifyDOM = content => DOMPurify.sanitize(content);
