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
      <Modal />
    </div>
    <Notifs />
  </div>
);

MainRoutes.propTypes = {
  theme: PropTypes.object.isRequired,
};


export default MainRoutes;
