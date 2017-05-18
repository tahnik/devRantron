import { connect } from 'react-redux';
import Column from '../../components/feeds/column';
import fetch from '../../actions/fetch';
import vote from '../../actions/vote';
import { ITEM, FEED } from '../../consts/types';

const mapDispatchToProps = dispatch => ({
  fetch: (sort, range, type = FEED.RANTS.NAME) => {
    dispatch(fetch(sort, type, range));
  },
  vote: (voteState, rantID, type = ITEM.RANT.NAME) => {
    dispatch(vote(voteState, rantID, type));
  },
});

const mapStateToProps = state => ({
  feed: state.items,
  theme: state.settings.theme,
  filters: FEED.RANTS.FILTERS,
});

export default connect(mapStateToProps, mapDispatchToProps)(Column);

