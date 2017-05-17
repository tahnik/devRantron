const getEndOfDiv = (divID, callback) => {
  const element = document.getElementById(divID);
  if (element.scrollHeight - element.scrollTop === element.clientHeight) {
    callback();
  }
};

const getRandomInt = () => Math.floor(Math.random() * ((3000 - 0) + 1));

export { getEndOfDiv, getRandomInt }; //eslint-disable-line
