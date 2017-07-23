import { connect } from 'react-redux';
import Modal from '../../components/modal/modal';
import vote from '../../actions/vote';
import { fetchNotifs } from '../../actions/notifs';
import { openModal, closeModal } from '../../actions/modal';

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
  open: (type, id) => {
    dispatch(openModal(type, id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
