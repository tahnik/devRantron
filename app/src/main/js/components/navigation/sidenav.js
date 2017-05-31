import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Item from './items';
import CompactUserCard from '../user/compact_user_card';

class SideNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }
  getUserCard() {
    const { user, logout, login, fetchUser } = this.props;
    return (<CompactUserCard
      user={user}
      login={login}
      logout={logout}
      fetchUser={fetchUser}
    />);
  }
  render() {
    const { sideNavItems, history, location, resetColumn } = this.props;
    return (
      <div className="sidenav_container" >
        <div className="navs">
          <div className="devRant_logo">
            { this.getUserCard() }
          </div>
          {
            sideNavItems.map(item => (
              <Item
                key={item.route}
                item={item}
                active={location.pathname === item.route ? 'active' : null}
                onClick={() => {
                  resetColumn();
                  history.push(item.route);
                }}
              />
            ))
          }
        </div>
        <div className="profile" />
      </div>
    );
  }
}

SideNav.propTypes = {
  sideNavItems: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  fetchUser: PropTypes.func.isRequired,
  resetColumn: PropTypes.func.isRequired,
};

export default SideNav;
