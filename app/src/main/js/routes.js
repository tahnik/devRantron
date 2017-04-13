import {
  HashRouter as Router,
  Route,
} from 'react-router-dom';
import React from 'react';
import Feed from './components/feed';
import Nav from './components/nav';
import Settings from './components/settings';
import ROUTES from './consts/routes';

function Main(match) {
  return (
    <div>
      <Nav match={match} />
      <Route exact path={ROUTES.main.root} component={Feed} />
      <Route path={ROUTES.main.stories} component={Feed} />
      <Route path={ROUTES.main.collabs} component={Feed} />
      <Route path={ROUTES.main.weekly} component={Feed} />
      <Route path={ROUTES.main.settings} component={Settings} />
    </div>
  );
}

function Auth() {
  return (
    <div>

    </div>
  );
}

function Routes() {
  return (
    <Router>
      <div>
        <Route path={ROUTES.main.root} component={Main} />
        <Route path={ROUTES.auth.root} component={Auth} />
      </div>
    </Router>
  );
}

export default Routes;
