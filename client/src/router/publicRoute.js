import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { REDIRECT_URL } from '../constants';

const PublicRoute = ({ component: Component, ...rest }) => {
  const isAuth = () => {
    let authToken = localStorage.getItem('auth-token');
    if (authToken) return true;
    else return false;
  }
  return (
    <Route {...rest} render={props => (
      isAuth() ?
        <Redirect to={REDIRECT_URL} />
        : <Component {...props} />
    )} />
  );
};

export default PublicRoute;