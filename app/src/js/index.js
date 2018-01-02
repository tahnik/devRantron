import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Root from './routes/index';
import store from './store';

const render = (Component) => {
  ReactDOM.render(
    <Provider store={store}>
      <Component />
    </Provider>,
    document.getElementById('root'),
  );
};

render(Root);

if (module.hot) {
  module.hot.accept('./routes/index', () => {
    // eslint-disable-next-line
    const nextApp = require('./routes/index').default;
    render(nextApp);
  });
}

document.addEventListener('keydown', (e) => {
  if (e.which === 123) {
    // eslint-disable-next-line
    require('electron').remote.getCurrentWindow().toggleDevTools();
  } else if (e.which === 116) {
    // eslint-disable-next-line
    location.reload();
  }
});

// Warning message in console
setTimeout(() => {
  console.log("%cHollup!\n%cSince you're most likley a dev ya already know this, but just to be sure, if anyone told you to write something here you're 110% getting screwed. ", 'color: red; font-size:64px; -webkit-text-stroke: 2px black;', 'color: red; font-size:14px;');
}, 1000);
