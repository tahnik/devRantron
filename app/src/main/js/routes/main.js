import React, { Component } from 'react';
import {
  Route,
  Redirect,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import SideNav from '../containers/navigation/sidenav';
import Notifs from '../containers/notifs/notifs';
import Rants from '../containers/feeds/rants';
import Modal from '../containers/modal/modal';

class MainRoutes extends Component {
  constructor() {
    super();
    this.state = {
      item: null,
    };
  }
  openModal(type, id) {
    this.setState({ item: { type, id } });
  }
  closeModal() {
    this.setState({ item: null });
  }
  render() {
    return (
      <div key="MainRoutes" className="main_container" >
        <SideNav />
        <div
          className="middle_container"
          id="middle_container"
          style={{ backgroundColor: this.props.theme.backgroundColor }}
        >
          <Route exact path="/" render={() => (<Redirect to="/rants" />)} />
          <Route
            path="/rants"
            render={() => (
              <Rants
                open={(type, id) => this.openModal(type, id)}
              />
            )}
          />
          {
            this.state.item ?
              <Modal
                item={this.state.item}
                close={() => this.closeModal()}
              /> : null
          }
        </div>
        <Notifs />
      </div>
    );
  }
}


MainRoutes.propTypes = {
  theme: PropTypes.object.isRequired,
};

export default MainRoutes;
