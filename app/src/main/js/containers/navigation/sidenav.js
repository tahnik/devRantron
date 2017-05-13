import { connect } from 'react-redux';
import SideNav from '../../components/navigation/sidenav';

const mapDispatchToProps = dispatch => ({
  // login: (username, password) => {
  //   dispatch(login(username, password));
  // },
});

export default connect(null, mapDispatchToProps)(SideNav);

