import React from 'react';
import ROUTES from '../consts/routes';
import Login from '../containers/auth/login';
import Logout from '../containers/auth/logout';
import { connect } from 'react-redux';
import { routeAction } from '../actions/route';
/*
 * Why is it so complicated for a single route? Because in case we add
 * registration in future we will need this structure
 */
function Authentication(props) {
  let activeAuth = <Login key={ROUTES.auth.login} />;
  switch (props.match.url) {
    case ROUTES.auth.logout:
      activeAuth = <Logout key={props.match.url} />;
      break;
    default:
      activeAuth = <Login key={ROUTES.auth.login} />;
  }
  props.updateRoute(activeAuth.key);
  console.log(activeAuth)
  return (
    <div className="login_view">
      <div className="devrantron_image">
        <img alt="devrant" src="./res/images/devrant_sidebar.png" />
      </div>
      { activeAuth }
    </div>
  );
}

const mapDispatchToProps = {
  updateRoute: routeAction
}

export default connect(null, mapDispatchToProps)(Authentication);
