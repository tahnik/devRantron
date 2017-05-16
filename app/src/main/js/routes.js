import React from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
} from 'react-router-dom';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Auth from './containers/auth/auth';
import Toast from './containers/utilities/toast/toast';
import SideNav from './containers/navigation/sidenav';
import Notifs from './containers/notifs/notifs';
import Rants from './containers/feeds/rants';

const MainRoutes = ({ theme }) => (
  <div key="MainRoutes" className="main_container" >
    <SideNav />
    <div
      className="middle_container"
      id="middle_container"
      style={{ backgroundColor: theme.column.backgroundColor }}
    >
      <Route exact path="/" render={() => (<Redirect to="/rants" />)} />
      <Route path="/rants" component={Rants} />
    </div>
    <Notifs />
  </div>
);

const AuthRoutes = () => (
  <div key="AuthRoutes" >
    <Route exact path="/" component={Auth} />
    <Toast />
  </div>
);

const Routes = ({ auth, settings }) => (
  <Router>
    <div>
      <CSSTransitionGroup
        transitionName="fade"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}
      >
        { auth.user || auth.noLogin ? <MainRoutes theme={settings.theme} /> : null}
        { !auth.user && !auth.noLogin ? <AuthRoutes /> : null}
      </CSSTransitionGroup>
    </div>
  </Router>
  );
Routes.propTypes = {
  auth: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
};

MainRoutes.propTypes = {
  theme: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  settings: state.settings,
});

export default connect(mapStateToProps, null)(Routes);
