import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import Root from './routes/index';

import store from './store';

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>,
    document.getElementById('root'),
  );
};

render(Root);

if (module.hot) {
  module.hot.accept('./routes/index.js', () => {
    // eslint-disable-next-line
    const newRoot = require('./routes/index.js').default;
    render(newRoot);
  });
}
