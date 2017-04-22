import {
  HashRouter as Router,
  Route,
  Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';
import React from 'react';
import Feed from './components/feed';
import Nav from './components/nav';
import Settings from './components/settings';
import Authentication from './components/auth';
import Toast from './components/toast';
import ROUTES from './consts/routes';

function render(props) {
  let initialRoute = ROUTES.auth.login;
  let showNav = true;
  if (props.auth.token) {
    initialRoute = ROUTES.main.rants;
  }
  if (props.location.pathname === ROUTES.auth.login) {
    showNav = false;
  }
  return (
    <div>
      { showNav ? <Nav /> : null }
      <Toast />
      <Route path="/feeds/:feed" component={Feed} />
      <Route path={ROUTES.main.settings} component={Settings} />
      <Route path={ROUTES.auth.login} component={Authentication} />
      <Route path={ROUTES.auth.logout} component={Authentication} />
      <Redirect to={initialRoute} />
    </div>
  );
}

render.propTypes = {
  auth: React.PropTypes.object.isRequired,
  location: React.PropTypes.object.isRequired,
};


function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

function Routes() {
  return (
    <Router>
      <div>
        <Route path="/" component={connect(mapStateToProps, null)(render)} />
      </div>
    </Router>
  );
}


export default Routes;
