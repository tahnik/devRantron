
const getRandomInt = () => Math.floor(Math.random() * ((3000 - 0) + 1));

const getUID = () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    let r = Math.random() * 16 | 0, //eslint-disable-line
      v = c == 'x' ? r : (r & 0x3 | 0x8); //eslint-disable-line
  return v.toString(16);
});

const getNotifText = (type, username) => {
  switch (type) {
    case 'comment_mention':
      return `${username} mentioned you in a comment.`;
    case 'comment_content':
      return `${username} commented on your rant.`;
    case 'comment_discuss':
      return 'New comments on a rant you follow.';
    case 'comment_vote':
      return `${username} +1'd your comment.`;
    default:
      return `${username} +1'd your rant.`;
  }
};

export { getRandomInt, getUID, getNotifText };
