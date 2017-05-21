import { connect } from 'react-redux';
import Columns from '../../components/columns/columns';
import fetch from '../../actions/fetch';
import vote from '../../actions/vote';
import { ITEM, FEED } from '../../consts/types';

const mapDispatchToProps = dispatch => ({
  fetch: (sort, range, id = 0, type = FEED.RANTS.NAME) => {
    dispatch(fetch(sort, type, id, range));
  },
  vote: (voteState, id, type = ITEM.RANT.NAME) => {
    dispatch(vote(voteState, id, type));
  },
});

const mapStateToProps = state => ({
  columns: state.columns,
  theme: state.settings.theme,
  filters: FEED.RANTS.FILTERS,
  itemType: ITEM.RANT.NAME,
});

export default connect(mapStateToProps, mapDispatchToProps)(Columns);

