import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ROUTES } from '../routes';
import { changeStyle } from '../actions/style_actions';


class SideNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sideNavHidden: true,
    };
  }
  componentDidMount() {
    const nav = document.getElementById('togglable_nav');
    nav.style.webkitTransform = 'translateX(-100%)';
  }
  hideNav() {
    this.setState({ sideNavHidden: true });
    const nav = document.getElementById('togglable_nav');
    nav.style.webkitTransform = 'translateX(-100%)';
  }
  showNav() {
    this.setState({ sideNavHidden: false });
    const nav = document.getElementById('togglable_nav');
    nav.style.webkitTransform = 'translateX(0)';
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
      <div>
        <div className="togglable_side_nav" id="togglable_nav">
          <ul>
            <li>
              <Link to={ROUTES.root} className="btn" >
                Rant feed
              </Link>
            </li>
            <li>
              <Link to={ROUTES.collabs} className="btn" >
                Collabs
              </Link>
            </li>
            <li>
              <Link to={ROUTES.stories} className="btn" >
                Stories
              </Link>
            </li>
            <li>
              <Link to={ROUTES.settings} className="btn" >
                Settings
              </Link>
            </li>
          </ul>
        </div>
        <div className="static_side_nav">
          <button
            onClick={() => this.toggleNav()}
            onBlur={() => this.hideNav()}
            className="btn side_nav_toggle"
          >
            <i className="ion-navicon-round" />
          </button>
          <ul>
            <li>
              <Link to={ROUTES.root} className="btn" >
                <i className="ion-chatbubble" />
              </Link>
            </li>
            <li>
              <Link to={ROUTES.collabs} className="btn" >
                <i className="ion-chatbubbles" />
              </Link>
            </li>
            <li>
              <Link to={ROUTES.stories} className="btn" >
                <i className="ion-ios-book" />
              </Link>
            </li>
            <li>
              <Link to={ROUTES.settings} className="btn" >
                <i className="ion-ios-gear" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

SideNav.propTypes = {
  changeStyle: React.PropTypes.func.isRequired,
};

export default connect(null, { changeStyle })(SideNav);
