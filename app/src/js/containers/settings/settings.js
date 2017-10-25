import { connect } from 'react-redux';
import Settings from '../../components/settings/settings';
import { changeGeneral } from '../../actions/settings';


const mapDispatchToProps = dispatch => ({
  changeGeneral: (primarykey, secondaryKey, value) => {
    dispatch(changeGeneral(primarykey, secondaryKey, value));
  },
});

const mapStateToProps = state => ({
  settings: state.settings,
  theme: state.settings.theme,
});


export default connect(mapStateToProps, mapDispatchToProps)(Settings);
