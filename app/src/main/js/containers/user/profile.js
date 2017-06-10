import { connect } from 'react-redux';
import Profile from '../../components/user/profile';
import vote from '../../actions/vote';

const mapStateToProps = state => ({
  user: state.user,
  theme: state.theme,
});

const mapDispatchToProps = dispatch => ({
  vote: (voteState = 1, id, type) => {
    dispatch(vote(voteState, id, type));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
