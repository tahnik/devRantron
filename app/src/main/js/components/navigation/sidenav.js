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
  componentDidMount() {
    // This causes lag when tapping top_nav. Why?
    // this.props.fetchUser();
  }
  getUserCard() {
    const { user, logout, login } = this.props;
    if (user.profile) {
      return <CompactUserCard profile={user} logout={logout} />;
    }
    return (
      <div className="devRant_placeholder">
        <div className="logo">
          <img alt="" src="../../../res/images/devrant_sidebar.png" />
        </div>
        <button onClick={() => login()}>Login</button>
      </div>
    );
  }
  render() {
    const { sideNavItems, history, location } = this.props;
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
                onClick={() => { history.push(item.route); }}
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
  fetchUser: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
};

export default SideNav;
