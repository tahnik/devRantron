import React from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';
import Auth from './containers/auth/auth';
import Toast from './containers/utilities/toast/toast';

/* const MainRoutes = () => {
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
};*/

const AuthRoutes = (
  <Router>
    <div>
      <Route exact path="/" component={Auth} />
      <Toast />
    </div>
  </Router>
);

const Routes = (props) => {
  if (!props.auth.user) {
    return AuthRoutes;
  }
  return AuthRoutes;
};

const mapStateToProps = state => ({
  auth: state.auth,
});


export default connect(mapStateToProps, null)(Routes);
