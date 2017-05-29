import { connect } from 'react-redux';
import Modal from '../../components/modal/modal';
import vote from '../../actions/vote';
import { closeModal } from '../../actions/modal';

const mapStateToProps = state => ({
  theme: state.settings.theme,
  auth: state.auth,
  item: state.modal.item,
});

const mapDispatchToProps = dispatch => ({
  vote: (voteState = 1, id, type) => {
    dispatch(vote(voteState, id, type));
  },
  close: () => {
    dispatch(closeModal());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
