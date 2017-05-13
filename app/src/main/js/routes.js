import React from 'react';
import {
  HashRouter as Router,
  Route,
} from 'react-router-dom';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Auth from './containers/auth/auth';
import Toast from './containers/utilities/toast/toast';
import SideNav from './containers/navigation/sidenav';

const MainRoutes = () => (
  <div key="MainRoutes" className="main_container" >
    <SideNav />
  </div>
);

const AuthRoutes = () => (
  <div key="AuthRoutes" >
    <Route exact path="/" component={Auth} />
    <Toast />
  </div>
);

const Routes = ({ auth }) => {
  return (
    <Router>
      <div>
        <CSSTransitionGroup
          transitionName="fade"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
        >
          {auth.user ? <MainRoutes /> : null}
          {!auth.user ? <AuthRoutes /> : null}
        </CSSTransitionGroup>
      </div>
    </Router>
  );
};

Routes.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});


export default connect(mapStateToProps, null)(Routes);
