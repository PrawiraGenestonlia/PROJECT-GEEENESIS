import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { LOGIN_URL } from './constants.router';


const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuth = () => {
    let authToken = localStorage.getItem('auth-token');
    if (authToken) return true;
    else return false;
  }
  return (
    <Route {...rest} render={props => (
      isAuth() ?
        <div className="screen">
          <Component {...props} />
        </div>
        : <Redirect to={LOGIN_URL} />
    )} />
  );
};

export default PrivateRoute;