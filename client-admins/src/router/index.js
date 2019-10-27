import React, { useState } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import { ADMIN_LOGIN_URL } from '../constants';
import { LoginPage } from '../app/pages';

function Display(props) {
  const { page } = props;
  return (
    <div>{page}</div>
  )
}

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
        : <Redirect to="/login" />
    )} />
  );
};

function Router() {
  return (
    <Switch>
      <Route exact path="/" component={() => <Display page='Home' />} />
      <Route exact path={ADMIN_LOGIN_URL} component={LoginPage} />
      <PrivateRoute exact path={"/protected"} component={() => <Display page='Protected' />} />
      <Route component={() => <Display page='Not Found' />} />
    </Switch>
  )
}

export default Router;