import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];

export default function createStore() {
  return configureMockStore(middlewares);
}
