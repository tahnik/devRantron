import {
  HashRouter as Router,
  Route,
  Redirect,
} from 'react-router-dom';
import React from 'react';

const MainRoutes = () => {
  <Router>
    <SideNav />
    <Route
      exact
      path="/"
      component={() => (
        <Redirect to="/rants" />
      )}
    />
    <Route path="/rants" component={Rants} />
    <Route path="/weekly" component={Weekly} />
    <Route path="/stories" component={Stories} />
    <Route path="/collabs" component={Collabs} />
    <Route path="/settings" component={Settings} />
    <SideColumn />
    <Notifications />
  </Router>;
};

const AuthRoutes = () => {
  <Router>
    <Route exact path="/" component={Auth} />
  </Router>;
};

const Routes = (props) => {
  if (!props.auth.user || !props.settings.noLogin) {
    return AuthRoutes;
  }
  return MainRoutes;
};
