import {
  HashRouter as Router,
  Route,
  Redirect,
} from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import React from 'react';
import Feed from './components/feed';
import Nav from './components/nav';
import Settings from './components/settings';
import ROUTES from './consts/routes';

function Main(match) {
  return (
    <div>
      <Nav match={match} />
      <Route
        exact path={ROUTES.main.root} render={() => (
          <Redirect to={ROUTES.main.rants} />
        )}
      />
      <Route path="/:feed" component={Feed} />
      <Route path={ROUTES.main.settings} component={Settings} />
    </div>
  );
}

function Auth() {
  return (
    <div />
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
