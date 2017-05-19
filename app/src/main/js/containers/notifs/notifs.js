import { connect } from 'react-redux';
import Notifs from '../../components/notifs/notifs';
import { fetchNotifs } from '../../actions/notifs';

/* Here we ask redux to give us this states
 * auth is needed as we will only show notif if the user is authenticated
 */
const mapStateToProps = state => ({
  auth: state.auth,
  notifs: state.notifs,
});

/* Here we use dispatch to dispatch actions to redux store
 *
 */
const mapDispatchToProps = dispatch => ({
  fetchNotifs: () => {
    dispatch(fetchNotifs());
  },
});

/* We use higher order component to connect our notif component with redux
 * Basically we are saying that: Redux, I need these state from your
 * store (mapStateToProps), and I will dispatch these actions to your
 * store (mapDispatchToProps). Please make them available to our notif
 * component
 */
export default connect(mapStateToProps, mapDispatchToProps)(Notifs);

