import { connect } from 'react-redux';
import React from 'react';
import Item from '../../components/navigation/items';
import ROUTES from '../../consts/routes';
import { withRouter } from 'react-router';

const mapDispatchToProps = dispatch => ({
  // login: (username, password) => {
  //   dispatch(login(username, password));
  // },
});

const SIDE_NAV_ITEMS = [
  { name: 'Rants', route: ROUTES.rants, icon: 'ion-chatboxes' },
  { name: 'Collabs', route: ROUTES.collabs, icon: 'ion-person-stalker' },
  { name: 'Stories', route: ROUTES.stories, icon: 'ion-ios-bookmarks' },
  { name: 'Weekly', route: ROUTES.weekly, icon: 'ion-calendar' },
  { name: 'Settings', route: ROUTES.settings, icon: 'ion-android-settings' },
];

export default withRouter(connect(null, mapDispatchToProps)(({ history }) => (
  <div className="sidenav_container" >
    <div className="navs">
      <div className="devRant_logo">
        <img alt="" src="../../../res/images/devrant_sidebar.png" />
      </div>
      {
        SIDE_NAV_ITEMS.map(item => (
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
)));

