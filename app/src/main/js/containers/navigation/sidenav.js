import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import SideNav from '../../components/navigation/sidenav';
import ROUTES from '../../consts/routes';
import { fetchUser } from '../../actions/user';
import { logout, noLogin } from '../../actions/auth';
import { resetColumn } from '../../actions/fetch';

const SIDE_NAV_ITEMS = [
  { name: 'Rants', route: ROUTES.rants, icon: 'ion-chatboxes' },
  { name: 'Collabs', route: ROUTES.collabs, icon: 'ion-person-stalker' },
  { name: 'Stories', route: ROUTES.stories, icon: 'ion-ios-bookmarks' },
  { name: 'Custom', route: ROUTES.custom, icon: 'ion-edit' },
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
});

const mapStateToProps = state => ({
  theme: state.theme,
  auth: state.auth,
  user: state.user,
  sideNavItems: SIDE_NAV_ITEMS,
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SideNav));
