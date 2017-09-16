import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Weekly from '../../components/weekly/weekly';
import fetch from '../../actions/fetch';
import vote from '../../actions/vote';
import { ITEM, FEED } from '../../consts/types';
import { openModal } from '../../actions/modal';
import showToast from '../../actions/toast';

const mapDispatchToProps = dispatch => ({
  fetch: (sort, range, id = 0, refresh = false, week) => {
    dispatch(fetch(sort, FEED.WEEKLY.NAME, id, range, refresh, week));
  },
  vote: (voteState, id, type = ITEM.RANT.NAME) => {
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
  filters: FEED.WEEKLY.FILTERS,
  itemType: ITEM.WEEKLY.NAME,
  auth: state.auth,
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Weekly));
