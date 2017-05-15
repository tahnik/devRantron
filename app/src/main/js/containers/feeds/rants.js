import { connect } from 'react-redux';
import Column from '../../components/feeds/column';
import fetch from '../../actions/fetch';
import vote from '../../actions/vote';
import { ITEM, FEED } from '../../consts/types';

const mapDispatchToProps = dispatch => ({
  fetch: (type = FEED.RANTS.NAME, id) => {
    dispatch(fetch(type, id));
  },
  vote: (voteState, rantID, type = ITEM.TYPE.RANT) => {
    dispatch(vote(voteState, rantID, type));
  },
});

const mapStateToProps = state => ({
  feed: state.rants,
  theme: state.settings.theme,
});

export default connect(mapStateToProps, mapDispatchToProps)(Column);

