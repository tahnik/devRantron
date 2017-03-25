import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../routes';


class SideNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sideNavHidden: true,
      translateX: 70,
      display: 'none',
    };
  }
  hideNav() {
    this.setState({ sideNavHidden: true, translateX: 70, display: 'none' });
  }
  showNav() {
    this.setState({ sideNavHidden: false, translateX: 200, display: 'block' });
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
        <div className="drawer" style={{ width: `${this.state.translateX}px` }} >
          <div
            className="drawer_item"
            onClick={() => this.toggleNav()}
            onBlur={() => this.hideNav()}
            >
            <div className="drawer_icon" >
              <i className="ion-chatbubble" />
            </div>
            <div
              className="drawer_text"
            >
              <span>Rants</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default SideNav;
