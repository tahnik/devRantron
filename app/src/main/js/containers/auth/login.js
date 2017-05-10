import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import ROUTES from '../../consts/routes';
import { changeNoLogin } from '../../actions/settings';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }
  render() {
    if (this.props.token || this.props.noLogin) {
      return (
        <Redirect to={ROUTES.main.rants} />
      );
    }
    return (
      <div className="signin">
        <div className="row">
          <form className="col s12">
            <div className="row signup-email email-hidden" id="signup-email">
              <div className="input-field col s12">
                <input
                  onChange={event => this.setState({ username: event.target.value })}
                  placeholder="Email"
                  id="email" type="email" className="validate"
                />
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                  onChange={event => this.setState({ username: event.target.value })}
                  placeholder="Username"
                  id="first_name" type="text" className="validate"
                />
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                  onChange={event => this.setState({ password: event.target.value })}
                  placeholder="Password"
                  id="password" type="password" className="validate"
                />
              </div>
            </div>
          </form>
          <button
            onClick={() => this.props.login(
              this.state.username,
              this.state.password,
            )}
            className="waves-effect waves-light btn"
          >Login</button>
          <button
            onClick={() => this.props.changeNoLogin(true)}
            className="waves-effect waves-light btn"
          >Not now</button>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  login: React.PropTypes.func.isRequired,
  token: React.PropTypes.string, // eslint-disable-line
  changeNoLogin: React.PropTypes.func.isRequired,
  noLogin: React.PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    token: state.auth.token,
    auth: state.auth,
    noLogin: state.settings.noLogin,
  };
}

export default connect(mapStateToProps, { login, changeNoLogin })(Login);
