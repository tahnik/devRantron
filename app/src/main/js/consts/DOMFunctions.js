
const getRandomInt = () => Math.floor(Math.random() * ((3000 - 0) + 1));

const getUID = () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    let r = Math.random() * 16 | 0, //eslint-disable-line
      v = c == 'x' ? r : (r & 0x3 | 0x8); //eslint-disable-line
  return v.toString(16);
});

export { getRandomInt, getUID };
