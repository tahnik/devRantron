import { connect } from 'react-redux';
import Search from '../../components/search/search';
import vote from '../../actions/vote';
import { ITEM } from '../../consts/types';
import { openModal } from '../../actions/modal';
import showToast from '../../actions/toast';

const mapDispatchToProps = dispatch => ({
  vote: (voteState, id, type = ITEM.COLLAB.NAME) => {
    dispatch(vote(voteState, id, type));
  },
  open: (type, id) => {
    dispatch(openModal(type, id));
  },
  showToast: (text) => {
    dispatch(showToast(text, 1000));
  },
});

const mapStateToProps = state => ({
  column: state.column,
  theme: state.settings.theme,
  auth: state.auth,
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
