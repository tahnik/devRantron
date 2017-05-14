import { connect } from 'react-redux';
import Modal from '../../components/modal/modal';
import { fetchRants } from '../../actions/rants';
import { voteRant } from '../../actions/rant';

const mapDispatchToProps = dispatch => ({
  fetch: () => {
    dispatch(fetchRants());
  },
  vote: (voteState, rantID) => {
    dispatch(voteRant(voteState, rantID));
  },
});

const mapStateToProps = state => ({
  theme: state.settings.theme,
  items: state.items,
});

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
