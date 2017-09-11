
import React from 'react';
import {
  Route,
  Redirect,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import AsyncComponent from '../utils/asyncComponent';
import SideNav from '../containers/navigation/sidenav';
import Rants from '../containers/feeds/rants';
import Stories from '../containers/feeds/stories';
import Collabs from '../containers/feeds/collabs';
import Modal from '../containers/modal/modal';
import Notifs from '../containers/notifs/notifs';

/* eslint-disable */

/**
 * If you see eslint errors in here in VSCode, ignore them
 */

const Search = AsyncComponent(
  () => import(/* webpackChunkName: "search" */ '../containers/search/search'),
);

const Settings = AsyncComponent(
  () => import(/* webpackChunkName: "settings" */ '../containers/settings/settings'),
);

const Toast = AsyncComponent(
  () => import(/* webpackChunkName: "toast" */ '../containers/utilities/toast/toast'),
);

const Custom = AsyncComponent(
  () => import(/* webpackChunkName: "custom" */ '../containers/feeds/custom'),
);

/*eslint-enable*/

const MainRoutes = props => (
  <div key="MainRoutes" className="main_container" >
    <SideNav />
    <div
      className="middle_container"
      id="middle_container"
      style={{ backgroundColor: props.theme.backgroundColor }}
    >
      <Route exact path="/" render={() => (<Redirect to="/rants" />)} />
      <Route
        path="/rants"
        render={() => (
          <Rants />
        )}
      />
      <Route
        path="/stories"
        render={() => (
          <Stories />
        )}
      />
      <Route
        path="/collabs"
        render={() => (
          <Collabs />
        )}
      />
      <Route
        path="/custom"
        render={() => (
          <Custom />
        )}
      />
      <Route
        path="/settings"
        render={() => (
          <Settings />
        )}
      />
      <Route
        path="/search/:term"
        render={() => (
          <Search />
        )}
      />
      <Modal />
    </div>
    <Notifs />
    <Toast />
  </div>
);

MainRoutes.propTypes = {
  theme: PropTypes.object.isRequired,
};


export default MainRoutes;
