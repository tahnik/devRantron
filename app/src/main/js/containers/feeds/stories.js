import { connect } from 'react-redux';
import Column from '../../components/feeds/column';
import fetch from '../../actions/fetch';
import vote from '../../actions/vote';
import { ITEM, FEED } from '../../consts/types';

const mapDispatchToProps = dispatch => ({
  fetch: (range, sort, type = FEED.STORIES.NAME) => {
    dispatch(fetch(sort, type, range));
  },
  vote: (voteState, rantID, type = ITEM.RANT.NAME) => {
    dispatch(vote(voteState, rantID, type));
  },
});

const mapStateToProps = state => ({
  feed: state.stories,
  theme: state.settings.theme,
  filters: FEED.STORIES.FILTERS,
});

export default connect(mapStateToProps, mapDispatchToProps)(Column);

