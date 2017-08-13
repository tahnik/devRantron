import { connect } from 'react-redux';
import Modal from '../../components/modal/modal';
import vote from '../../actions/vote';
import { fetchNotifs, clearNotif } from '../../actions/notifs';
import { openModal, closeModal } from '../../actions/modal';
import showToast from '../../actions/toast';

const mapStateToProps = state => ({
  theme: state.settings.theme,
  auth: state.auth,
  item: state.modal.item,
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  vote: (voteState = 1, id, type) => {
    dispatch(vote(voteState, id, type));
  },
  close: () => {
    dispatch(closeModal());
  },
  fetchNotifs: () => {
    dispatch(fetchNotifs());
  },
  clearNotif: (id) => {
    dispatch(clearNotif(id));
  },
  open: (type, id) => {
    dispatch(openModal(type, id));
  },
  showToast: (text) => {
    dispatch(showToast(text, 1000));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
