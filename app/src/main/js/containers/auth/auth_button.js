import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ROUTES from '../../consts/routes';

function AuthButton(props) {
  let authRoute = ROUTES.auth.login;
  let authText = 'Login';
  let authIcon = 'ion-log-in';
  if (props.token) {
    authRoute = ROUTES.auth.logout;
    authText = 'Logout';
    authIcon = 'ion-log-out';
  }
  return (
    <Link to={authRoute} className="drawer_item btn" >
      <div className="drawer_icon" >
        <i className={authIcon} />
      </div>
      <div className="drawer_text" >
        <span>{authText}</span>
      </div>
    </Link>
  );
}

AuthButton.propTypes = {
  token: React.PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  return {
    token: state.auth.token,
  };
}

export default connect(
  mapStateToProps,
  null,
)(AuthButton);
