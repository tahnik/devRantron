import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import SideNav from '../../components/navigation/sidenav';
import ROUTES from '../../consts/routes';
import { fetchUser } from '../../actions/user';
import { logout, noLogin } from '../../actions/auth';
import { resetColumn } from '../../actions/fetch';
import { openModal } from '../../actions/modal';
import { ITEM } from '../../consts/types';

const SIDE_NAV_ITEMS = [
  { name: 'Rants', route: ROUTES.rants, icon: 'ion-chatboxes' },
  { name: 'Collabs', route: ROUTES.collabs, icon: 'ion-person-stalker' },
  { name: 'Stories', route: ROUTES.stories, icon: 'ion-ios-bookmarks' },
  { name: 'Weekly', route: ROUTES.weekly, icon: 'ion-android-calendar' },
  // { name: 'Custom', route: ROUTES.custom, icon: 'ion-edit' },
  { name: 'Search', route: ROUTES.search, icon: 'ion-android-search' },
  { name: 'Settings', route: ROUTES.settings, icon: 'ion-gear-a' },
];

const mapDispatchToProps = dispatch => ({
  fetchUser: () => {
    dispatch(fetchUser());
  },
  logout: () => {
    dispatch(logout());
  },
  login: (bool = false) => {
    dispatch(noLogin(bool));
  },
  resetColumn: () => {
    dispatch(resetColumn());
  },
  open: (type = ITEM.POST_RANT.NAME, id) => {
    dispatch(openModal(type, id));
  },
});

const mapStateToProps = state => ({
  theme: state.settings.theme,
  auth: state.auth,
  user: state.user,
  sideNavItems: SIDE_NAV_ITEMS,
  settings: state.settings,
  modalItem: state.modal.item,
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SideNav));
