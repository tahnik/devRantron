import { connect } from 'react-redux';
import Columns from '../../components/columns/columns';
import fetch, { addColumn } from '../../actions/fetch';
import vote from '../../actions/vote';
import { ITEM, FEED } from '../../consts/types';

const mapDispatchToProps = dispatch => ({
  fetch: (sort, range, id = 0, type = FEED.COLLABS.NAME) => {
    dispatch(fetch(sort, type, id, range));
  },
  vote: (voteState, id, type = ITEM.COLLAB.NAME) => {
    dispatch(vote(voteState, id, type));
  },
  addColumn: (type = null) => {
    dispatch(addColumn(type));
  },
});

const mapStateToProps = state => ({
  columns: state.columns,
  theme: state.settings.theme,
  filters: FEED.COLLABS.FILTERS,
  itemType: ITEM.COLLAB.NAME,
});

export default connect(mapStateToProps, mapDispatchToProps)(Columns);

