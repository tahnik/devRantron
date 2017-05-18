import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }
  render() {
    const { theme, auth, noLogin } = this.props;
    return (
      <div
        className="auth_container"
        style={{
          backgroundColor: theme.backgroundColor,
        }}
      >
        <div className="auth_image" >
          <img alt="devrant" src="./res/images/devrant_sidebar.png" />
        </div>
        <div className="auth_form" >
          <input
            value={this.state.username}
            onChange={e => this.setState({ username: e.target.value })}
            type="text"
            placeholder="Username or Email"
          />
          <input
            value={this.state.password}
            onChange={e => this.setState({ password: e.target.value })}
            type="password"
            placeholder="Password"
          />
          <button
            onClick={() => this.props.login(
              this.state.username,
              this.state.password,
            )}
            disabled={auth.state === 'STATE_LOADING'}
          >Login</button>
          <p onClick={() => noLogin(true)}><u>Not now</u></p>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  theme: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  noLogin: PropTypes.func.isRequired,
};

export default Login;
