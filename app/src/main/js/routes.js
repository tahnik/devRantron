import {
  HashRouter as Router,
  Route,
} from 'react-router-dom';
import React, { Component } from 'react';
import Header from './components/header';
import SideNav from './containers/side_nav';
import Rants from './components/rants';
import Stories from './components/stories';
import Collabs from './components/collabs';
import Settings from './components/settings';

export const ROUTES = {
  root: '/',
  rants: '/',
  stories: '/stories',
  collabs: '/collabs',
  settings: '/settings',
};


export default class extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header />
          <SideNav />
          <Route exact path={ROUTES.root} component={Rants} />
          <Route path={ROUTES.stories} component={Stories} />
          <Route path={ROUTES.collabs} component={Collabs} />
          <Route path={ROUTES.settings} component={Settings} />
        </div>
      </Router>
    );
  }
}
