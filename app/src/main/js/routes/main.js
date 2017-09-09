import React from 'react';
import {
  Route,
  Redirect,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import SideNav from '../containers/navigation/sidenav';
import Rants from '../containers/feeds/rants';
import Stories from '../containers/feeds/stories';
import Collabs from '../containers/feeds/collabs';
import Modal from '../containers/modal/modal';
import Notifs from '../containers/notifs/notifs';
import Custom from '../containers/feeds/custom';
import Toast from '../containers/utilities/toast/toast';
import Settings from '../containers/settings/settings';
import Search from '../containers/search/search';

const MainRoutes = props => (
  <div key="MainRoutes" className="main_container" >
    <div className="draggable-region" />
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
