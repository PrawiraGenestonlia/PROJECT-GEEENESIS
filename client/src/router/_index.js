import React, { } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import {
  ADMIN_LOGIN_URL,
  ADMIN_DASHBOARD_URL,
  ADMIN_USERMANAGEMENT_URL,
  ADMIN_EVENTMANAGEMENT_URL,
  ADMIN_MENTORING_URL,
  ADMIN_INFORMATION_URL,
  ADMIN_PROFILE_URL,
  CLUB_INFO_URL,
  EDITOR_URL,
  CALENDAR_OF_EVENTS,
} from '../constants';
import {
  LoginPage,
  DashboardPage,
  UserManagementPage,
  EventManagementPage,
  MentoringPage,
  InformationPage,
  CalendarOfEventsPage,
  ProfilePage,
  ClubInformationPage,
  EditorPage
} from '../admin-app/pages';

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
        : <Redirect to={ADMIN_LOGIN_URL} />
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
      <PrivateRoute exact path={ADMIN_EVENTMANAGEMENT_URL} component={EventManagementPage} />
      <PrivateRoute exact path={ADMIN_MENTORING_URL} component={MentoringPage} />
      <PrivateRoute exact path={ADMIN_INFORMATION_URL} component={InformationPage} />
      <PrivateRoute exact path={ADMIN_PROFILE_URL} component={ProfilePage} />
      <PrivateRoute exact path={CALENDAR_OF_EVENTS} component={CalendarOfEventsPage} />
      <PrivateRoute exact path={EDITOR_URL + ":subject/"} component={EditorPage} />
      <Route exact path={CLUB_INFO_URL + ":club/"} component={ClubInformationPage} />
      {/* <Route component={() => <Display page='Not Found' />} /> */}
    </Switch>
  )
}

export default Router;