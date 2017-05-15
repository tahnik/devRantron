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
  componentWillMount() {
    this.props.fetchUser();
  }
  render() {
    console.log("user", this.props.user.profile);
    const { sideNavItems, history } = this.props;
    return (
      <div className="sidenav_container" >
        <div className="navs">
          <div className="devRant_logo">
            <CompactUserCard profile={this.props.user} />
          </div>
          {
            sideNavItems.map(item => (
              <Item
                key={item.route}
                item={item}
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
};

export default SideNav;
