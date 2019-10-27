import React, { useState } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import {
  ADMIN_LOGIN_URL,
  ADMIN_DASHBOARD_URL,
  ADMIN_USERMANAGEMENT_URL
} from '../constants';
import {
  LoginPage,
  DashboardPage,
  UserManagementPage
} from '../app/pages';

function Display(props) {
  const { page } = props;
  return (
    <div>{page}</div>
  )
}

const PublicRoute = ({ component: Component, ...rest }) => {
  const isAuth = () => {
    let authToken = localStorage.getItem('auth-token');
    if (authToken) return true;
    else return false;
  }
  return (
    <Route {...rest} render={props => (
      isAuth() ?
        <Redirect to={ADMIN_DASHBOARD_URL} />
        : <Component {...props} />
    )} />
  );
};

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
      <Route exact path="/" component={() => <Redirect to={ADMIN_LOGIN_URL} />} />
      <PublicRoute exact path={ADMIN_LOGIN_URL} component={LoginPage} />
      <PrivateRoute exact path={ADMIN_DASHBOARD_URL} component={DashboardPage} />
      <PrivateRoute exact path={ADMIN_USERMANAGEMENT_URL} component={UserManagementPage} />


      <Route component={() => <Display page='Not Found' />} />
    </Switch>
  )
}

export default Router;