import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Item from './items';
import CompactUserCard from '../user/compact_user_card';
import { ITEM } from '../../consts/types';

const { ipcRenderer } = require('electron');

class SideNav extends Component {
  componentDidMount() {
    ipcRenderer.on('compose_rant', () => { this.props.open(); });
    document.addEventListener('keydown', (e) => {
      if (e.which === 13 && e.ctrlKey) {
        if (!this.props.modalItem) {
          this.props.open();
        }
      }
    });
  }
  getUserCard() {
    const {
      user, logout, login, fetchUser, open, theme,
    } = this.props;
    return (<CompactUserCard
      user={user}
      login={login}
      logout={logout}
      fetchUser={fetchUser}
      open={open}
      theme={theme}
    />);
  }
  render() {
    const {
      sideNavItems, history, location, resetColumn, open, settings, theme,
    } = this.props;
    return (
      <div
        className="sidenav_container"
        style={{ backgroundColor: theme.item_card.backgroundColor }}
      >
        <div className="navs">
          <div className="devRant_logo">
            { this.getUserCard() }
          </div>
          {
            sideNavItems.map(item => (
              <Item
                {...this.props}
                key={item.route}
                item={item}
                active={location.pathname === item.route ? 'active' : null}
                onClick={() => {
                  if (location.pathname !== item.route) {
                    resetColumn();
                    history.push(item.route);
                  }
                }}
              />
            ))
          }
          {
            settings.general.update.value &&
              <Item
                key="update"
                item={{ icon: 'ion-android-alert', name: 'Update Available', route: '/' }}
                active=""
                className="updateBtn"
                onClick={() => {
                  open(ITEM.RELEASE_INFO.NAME);
                }}
              />
          }
        </div>
        <div className="add_rant">
          <button
            onClick={() => open()}
            className="add_button"
            style={{
              backgroundColor: theme.plus_notif ? theme.plus_notif.backgroundColor : '#D55161',
              color: theme.id === 'dark_theme' ? '#ffffff' : theme.item_card.backgroundColor,
            }}
          >
            <i className="ion-plus-round" />
          </button>
        </div>
      </div>
    );
  }
}

SideNav.propTypes = {
  sideNavItems: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  fetchUser: PropTypes.func.isRequired,
  resetColumn: PropTypes.func.isRequired,
  open: PropTypes.func.isRequired,
  modalItem: PropTypes.object,
};

export default SideNav;
