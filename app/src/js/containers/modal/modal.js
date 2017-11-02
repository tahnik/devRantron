import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Modal from '../../components/modal/modal';
import vote from '../../actions/vote';
import { fetchNotifs } from '../../actions/notifs';
import { logout } from '../../actions/auth';
import { openModal, closeModal } from '../../actions/modal';
import { saveAutoSave,
  clearAutoSave, addDraft, removeDraft,
} from '../../actions/post_rant';
import showToast from '../../actions/toast';

const mapStateToProps = state => ({
  theme: state.settings.theme,
  auth: state.auth,
  item: state.modal.item,
  user: state.user,
  postRant: state.postRant,
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
  showToast: (text) => {
    dispatch(showToast(text, 1000));
  },
  logout: () => {
    dispatch(logout());
  },
  clearAutoSave: () => {
    dispatch(clearAutoSave());
  },
  saveAutoSave: (rant) => {
    dispatch(saveAutoSave(rant));
  },
  addDraft: (name, rant) => {
    dispatch(addDraft({ name, rant }));
  },
  removeDraft: (name) => {
    dispatch(removeDraft(name));
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Modal));
