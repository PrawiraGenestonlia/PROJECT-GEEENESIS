import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { HOME_URL } from './constants.router';

const PublicRoute = ({ component: Component, ...rest }) => {
  const isAuth = () => {
    let authToken = localStorage.getItem('auth-token');
    if (authToken) return true;
    else return false;
  }
  return (
    <Route {...rest} render={props => (
      isAuth() ?
        <Redirect to={HOME_URL} />
        : <Component {...props} />
    )} />
  );
};

export default PublicRoute;