/**
 * This is the login component
 * Used to log in a user
 */

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
  /**
   * When login is pressed a lot of state changes happen
   * that makes this component re-render couple of times.
   * We need to prevent that
   *
   * @param {any} nextProps The props that will arrive next
   * @memberof Login
   */
  shouldComponentUpdate(nextProps) {
    const { auth } = this.props;
    if (auth.noLogin === false && nextProps.auth.noLogin === true) {
      return false;
    }
    if (auth.user === null && nextProps.auth.user) {
      return false;
    }
    return true;
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
        <div className="auth_form"
          onSubmit={() => this.props.login(
              this.state.username,
              this.state.password,
            )}
        >
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
