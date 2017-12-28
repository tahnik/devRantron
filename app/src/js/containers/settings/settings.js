import { connect } from 'react-redux';
import Settings from '../../components/settings/settings';
import { changeGeneral, changeTheme } from '../../actions/settings';


const mapDispatchToProps = dispatch => ({
  changeGeneral: (primarykey, secondaryKey, value) => {
    dispatch(changeGeneral(primarykey, secondaryKey, value));
  },
  changeTheme: (key, value = null) => {
    dispatch(changeTheme(key, value));
  },
});

const mapStateToProps = state => ({
  settings: state.settings,
  theme: state.settings.theme,
  auth: state.auth,
});


export default connect(mapStateToProps, mapDispatchToProps)(Settings);
