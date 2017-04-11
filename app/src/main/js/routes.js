import {
  HashRouter as Router,
  Route,
} from 'react-router-dom';
import React, { Component } from 'react';
import Feed from './components/feed';
import Nav from './components/nav';
import Settings from './components/settings';
import ROUTES from './consts/routes';

export default class extends Component {
  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Route exact path={ROUTES.root} component={Feed} />
          <Route path={ROUTES.stories} component={Feed} />
          <Route path={ROUTES.collabs} component={Feed} />
          <Route path={ROUTES.weekly} component={Feed} />
          <Route path={ROUTES.settings} component={Settings} />
        </div>
      </Router>
    );
  }
}
