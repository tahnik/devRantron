import { connect } from 'react-redux';
import Notifs from '../../components/notifs/notifs';
import { fetchNotifs, clearNotifs, showNotifs } from '../../actions/notifs';
import { openModal } from '../../actions/modal';
import { ITEM } from '../../consts/types';

/* Here we ask redux to give us this states
 * auth is needed as we will only show notif if the user is authenticated
 */
const mapStateToProps = state => ({
  auth: state.auth,
  notifs: state.notifs,
});

/* Here we use dispatch to dispatch actions to redux store
 * We take notifs and state as params. We will send them to redux
 * store via actions
 */
const mapDispatchToProps = dispatch => ({
  fetchNotifs: () => {
    dispatch(fetchNotifs());
  },
  clearNotifs: () => {
    dispatch(clearNotifs());
  },
  open: (id, type = ITEM.RANT.NAME) => {
    dispatch(fetchNotifs());
    dispatch(openModal(type, id));
  },
  openNotif: (notif) => {
    dispatch(showNotifs(notif));
  },
});

/* We use higher order component to connect our notif component with redux
 * Basically we are saying that: Redux, I need these state from your
 * store (mapStateToProps), and I will dispatch these actions to your
 * store (mapDispatchToProps). Please make them available to our notif
 * component
 */
export default connect(mapStateToProps, mapDispatchToProps)(Notifs);

