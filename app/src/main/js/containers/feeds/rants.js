import { connect } from 'react-redux';
import Column from '../../components/feeds/column';
import { fetchRants } from '../../actions/rants';
import { voteRant } from '../../actions/rant';

const mapDispatchToProps = dispatch => ({
  fetch: () => {
    dispatch(fetchRants());
  },
  vote: (voteState, rantID) => {
    dispatch(voteRant(voteState, rantID));
  },
});

const mapStateToProps = state => ({
  feed: state.rants,
  theme: state.settings.theme,
});

export default connect(mapStateToProps, mapDispatchToProps)(Column);

