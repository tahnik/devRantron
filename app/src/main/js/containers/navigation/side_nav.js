import React, { Component } from 'react';
import { ROUTES } from '../../routes';
import SideNavItem from './side_nav_item';

const SIDE_NAV_ITEMS = [
  { name: 'Rants', route: '/rants', icon: 'ion-chatboxes' },
  { name: 'Collabs', route: '/collabs', icon: 'ion-person-stalker' },
  { name: 'Stories', route: '/stories', icon: 'ion-ios-bookmarks' },
  { name: 'Weekly', route: '/weekly', icon: 'ion-calendar' },
  { name: 'Settings', route: '/Settings', icon: 'ion-android-settings' },
];

class SideNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sideNavHidden: true,
      translateX: -130,
    };
  }
  hideNav() {
    this.setState({ sideNavHidden: true, translateX: -130 });
  }
  showNav() {
    this.setState({ sideNavHidden: false, translateX: 0 });
  }
  toggleNav() {
    if (this.state.sideNavHidden) {
      this.showNav();
    } else {
      this.hideNav();
    }
  }
  render() {
    return (
      <div className="side_nav" id="side_nav">
        <button
          onClick={() => this.toggleNav()}
          onBlur={() => this.hideNav()}
          className="btn side_nav_toggle"
        >
          <i className="ion-navicon-round" />
        </button>
        <div
          className="drawer"
          style={{ transform: `translateX(${this.state.translateX}px)` }}
        >
          {
            SIDE_NAV_ITEMS.map(item => <SideNavItem item={item} key={item.name} />)
          }
        </div>
      </div>
    );
  }
}


export default SideNav;
