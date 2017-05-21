import { connect } from 'react-redux';
import Column from '../../components/columns/column';
import fetch from '../../actions/fetch';
import vote from '../../actions/vote';
import { ITEM, FEED } from '../../consts/types';

const mapDispatchToProps = dispatch => ({
  fetch: (range, sort, type = FEED.STORIES.NAME) => {
    dispatch(fetch(sort, type, range));
  },
  vote: (voteState, id, type = ITEM.RANT.NAME) => {
    dispatch(vote(voteState, id, type));
  },
});

const mapStateToProps = state => ({
  feed: state.items,
  theme: state.settings.theme,
  filters: FEED.STORIES.FILTERS,
  itemType: ITEM.STORIES.NAME,
});

export default connect(mapStateToProps, mapDispatchToProps)(Column);

