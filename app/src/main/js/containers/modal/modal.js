import { connect } from 'react-redux';
import Modal from '../../components/modal/modal';
import vote from '../../actions/vote';

const mapStateToProps = state => ({
  theme: state.settings.theme,
  auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
  vote: (voteState = 1, id, type) => {
    dispatch(vote(voteState, id, type));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
