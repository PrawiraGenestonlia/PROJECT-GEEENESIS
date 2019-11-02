import React from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import PrivateRoute from '../router/privateRoute';
import {
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
} from './pages';
import NavBar from './components/navBar';


export default () => {
  return (
    <div className="flex h-screen w-screen">
      <div className="static h-screen w-2/12 shadow-lg overflow-hidden" id="nav-container" style={{ minWidth: '12rem' }} >
        <NavBar />
      </div>
      <div className="h-full w-10/12 overflow-y-auto overflow-x-auto" style={{ backgroundColor: 'F5F6F7', minWidth: '30rem' }} >
        <div className="p-4">
          <Pages />
        </div>
      </div>
    </div>
  )
}

const Pages = () => (
  <Switch>
    <PrivateRoute exact path="/" component={() => <Redirect to={ADMIN_DASHBOARD_URL} />} />
    <PrivateRoute exact path={ADMIN_DASHBOARD_URL} component={DashboardPage} />
    <PrivateRoute exact path={ADMIN_USERMANAGEMENT_URL} component={UserManagementPage} />
    <PrivateRoute exact path={ADMIN_EVENTMANAGEMENT_URL} component={EventManagementPage} />
    <PrivateRoute exact path={ADMIN_MENTORING_URL} component={MentoringPage} />
    <PrivateRoute exact path={ADMIN_INFORMATION_URL} component={InformationPage} />
    <PrivateRoute exact path={ADMIN_PROFILE_URL} component={ProfilePage} />
    <PrivateRoute exact path={CALENDAR_OF_EVENTS} component={CalendarOfEventsPage} />
    <PrivateRoute exact path={EDITOR_URL + ":subject/"} component={EditorPage} />
    <Route exact path={CLUB_INFO_URL + ":club/"} component={ClubInformationPage} />
    <PrivateRoute path component={() => <Redirect to={ADMIN_DASHBOARD_URL} />} />
  </Switch>
)
