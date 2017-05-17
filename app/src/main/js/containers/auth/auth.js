import { connect } from 'react-redux';
import Login from '../../components/auth/login';
import { login, noLogin } from '../../actions/auth';

const mapStateToProps = state => ({
  theme: state.settings.theme,
  auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
  login: (username, password) => {
    dispatch(login(username, password));
  },
  noLogin: (bool) => {
    dispatch(noLogin(bool));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
