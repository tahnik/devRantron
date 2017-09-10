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
    location.reload();
  }
});
