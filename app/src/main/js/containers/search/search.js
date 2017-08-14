import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Search from '../../components/search/search';
import vote from '../../actions/vote';
import { ITEM } from '../../consts/types';
import { openModal } from '../../actions/modal';
import showToast from '../../actions/toast';
import { addToFreqTerms } from '../../actions/search';

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
  addToFreqTerms: (term) => {
    dispatch(addToFreqTerms(term));
  },
});

const mapStateToProps = state => ({
  column: state.column,
  theme: state.settings.theme,
  auth: state.auth,
  search: state.search,
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search));
