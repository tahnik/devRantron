import {
  HashRouter as Router,
  Route,
  Redirect,
} from 'react-router-dom';
import React from 'react';
import Feed from './components/feed';
import Nav from './components/nav';
import Settings from './components/settings';
import Authentication from './components/auth';
import ROUTES from './consts/routes';

function Main(match) {
  return (
    <div>
      <Nav match={match} />
      <Route
        exact path="/" render={() => (
          <Redirect to={ROUTES.main.rants} />
        )}
      />
      <Route path="/feeds/:feed" component={Feed} />
      <Route path={ROUTES.main.settings} component={Settings} />
    </div>
  );
}

function Auth() {
  return (
    <div>
      <Authentication />
    </div>
  );
}

function Routes() {
  return (
    <Router>
      <div>
        <Route path="/" component={Main} />
        <Route path={ROUTES.auth.root} component={Auth} />
      </div>
    </Router>
  );
}

export default Routes;
