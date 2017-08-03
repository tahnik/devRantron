import { connect } from 'react-redux';
import Column from '../../components/columns/column';
import fetch from '../../actions/fetch';
import vote from '../../actions/vote';
import { ITEM, FEED } from '../../consts/types';
import { openModal } from '../../actions/modal';
import showToast from '../../actions/toast';

const mapDispatchToProps = dispatch => ({
  fetch: (sort, range, id = 0, refresh = false) => {
    dispatch(fetch(sort, FEED.STORIES.NAME, id, range, refresh));
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
  filters: FEED.STORIES.FILTERS,
  itemType: ITEM.STORIES.NAME,
  auth: state.auth,
});

export default connect(mapStateToProps, mapDispatchToProps)(Column);

