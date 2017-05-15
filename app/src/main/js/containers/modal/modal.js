import { connect } from 'react-redux';
import Modal from '../../components/modal/modal';
import fetch from '../../actions/fetch';
import close from '../../actions/item';
import vote from '../../actions/vote';
import { ITEM, FEED } from '../../consts/types';

const mapDispatchToProps = dispatch => ({
  fetch: (type, id) => {
    dispatch(fetch(type, id));
  },
  vote: (voteState, rantID, type) => {
    dispatch(vote(voteState, rantID, type));
  },
  close: (id) => {
    dispatch(close(id));
  },
});

const mapStateToProps = state => ({
  theme: state.settings.theme,
  items: state.items,
});

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
