import React from 'react';
import {
  Route,
} from 'react-router-dom';
import Auth from '../containers/auth/auth';
import Toast from '../containers/utilities/toast/toast';

const AuthRoutes = () => (
  <div key="AuthRoutes" >
    <Route exact path="/" component={Auth} />
    <Toast />
  </div>
);

export default AuthRoutes;
