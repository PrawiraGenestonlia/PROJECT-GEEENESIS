import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { ADMIN_LOGIN_URL } from '../constants';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuth = () => {
    let authToken = localStorage.getItem('auth-token');
    if (authToken) return true;
    else return false;
  }
  return (
    <Route {...rest} render={props => (
      isAuth() ?
        <Component {...props} />
        : <Redirect to={ADMIN_LOGIN_URL} />
    )} />
  );
};

export default PrivateRoute;