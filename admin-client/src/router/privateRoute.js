import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { LOGIN_URL } from '../constants';

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
        : <Redirect to={LOGIN_URL} />
    )} />
  );
};

export default PrivateRoute;