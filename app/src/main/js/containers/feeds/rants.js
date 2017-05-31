import { connect } from 'react-redux';
import Column from '../../components/columns/column';
import fetch from '../../actions/fetch';
import vote from '../../actions/vote';
import { ITEM, FEED } from '../../consts/types';
import { openModal } from '../../actions/modal';

const mapDispatchToProps = dispatch => ({
  fetch: (sort, range, id = 0, refresh = false) => {
    dispatch(fetch(sort, FEED.RANTS.NAME, id, range, refresh));
  },
  vote: (voteState, id, type = ITEM.RANT.NAME) => {
    dispatch(vote(voteState, id, type));
  },
  open: (type, id) => {
    dispatch(openModal(type, id));
  },
});

const mapStateToProps = state => ({
  column: state.column,
  theme: state.settings.theme,
  filters: FEED.RANTS.FILTERS,
  itemType: ITEM.RANT.NAME,
});

export default connect(mapStateToProps, mapDispatchToProps)(Column);

