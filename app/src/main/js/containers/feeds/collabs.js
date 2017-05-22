import { connect } from 'react-redux';
import Column from '../../components/columns/column';
import fetch from '../../actions/fetch';
import vote from '../../actions/vote';
import { ITEM, FEED } from '../../consts/types';

const mapDispatchToProps = dispatch => ({
  fetch: (sort, range, type = FEED.COLLABS.NAME) => {
    dispatch(fetch(sort, type, range));
  },
  vote: (voteState, id, type = ITEM.COLLAB.NAME) => {
    dispatch(vote(voteState, id, type));
  },
});

const mapStateToProps = state => ({
  feed: state.items,
  theme: state.settings.theme,
  filters: FEED.COLLABS.FILTERS,
  itemType: ITEM.COLLAB.NAME,
});

export default connect(mapStateToProps, mapDispatchToProps)(Column);

