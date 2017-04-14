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
import ROUTES from './consts/routes';

function renderAuth() {
  return (
    <div>
      <Authentication />
      <Route path="/feeds/:feed" component={Feed} />
    </div>
  );
}

function renderMain() {
  return (
    <div>
      <Nav />
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

function render(props) {
  if (props.auth.token) {
    return (
      renderMain()
    );
  }
  return (
    renderAuth()
  );
}


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
