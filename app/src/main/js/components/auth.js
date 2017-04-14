import React from 'react';
import ROUTES from '../consts/routes';
import Login from '../containers/auth/login';

/*
 * Why is it so complicated for a single route? Because in case we add
 * registration in future we will need this structure
 */
function Authentication() {
  const activeAuth = <Login key={ROUTES.auth.login} />;
  return (
    <div>
      <div>
        NiceDesignOrImage
      </div>
      { activeAuth }
    </div>
  );
}

export default Authentication;
