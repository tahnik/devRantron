import { connect } from 'react-redux';
import Columns from '../../components/columns/columns';
import fetch, { addColumn, removeColumn } from '../../actions/fetch';
import vote from '../../actions/vote';
import { ITEM } from '../../consts/types';
import { openModal } from '../../actions/modal';

const mapDispatchToProps = dispatch => ({
  fetch: (sort, range, id = 0, refresh = false, type) => {
    dispatch(fetch(sort, type, id, range, refresh));
  },
  vote: (voteState, id, type = ITEM.RANT.NAME) => {
    dispatch(vote(voteState, id, type));
  },
  addColumn: (type = null) => {
    dispatch(addColumn(type));
  },
  removeColumn: (id) => {
    dispatch(removeColumn(id));
  },
  open: (type, id) => {
    dispatch(openModal(type, id));
  },
});

const mapStateToProps = state => ({
  columns: state.columns,
  theme: state.settings.theme,
});

export default connect(mapStateToProps, mapDispatchToProps)(Columns);

