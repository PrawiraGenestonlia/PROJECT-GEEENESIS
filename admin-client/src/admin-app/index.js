import React, { useState, } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
// import { CSSTransition } from 'react-transition-group';
import PrivateRoute from '../router/privateRoute';
import {
  ADMIN_DASHBOARD_URL,
  ADMIN_USERMANAGEMENT_URL,
  ADMIN_EVENTMANAGEMENT_URL,
  ADMIN_MENTORING_URL,
  ADMIN_SENIORBUDDY_URL,
  ADMIN_INFORMATION_URL,
  ADMIN_PROFILE_URL,
  CLUB_INFO_URL,
  EDITOR_URL,
  CALENDAR_OF_EVENTS,
  EVENT_EDITOR_URL,
} from '../constants';
import {
  DashboardPage,
  UserManagementPage,
  EventManagementPage,
  MentoringPage,
  SeniorBuddyPage,
  InformationPage,
  CalendarOfEventsPage,
  ProfilePage,
  ClubInformationPage,
  EditorPage,
  EventEditorPage
} from './pages';
import NavBar from './components/navBar';
import { StateProvider } from '../context';

export default () => {
  const [isNavHidden, setIsNavHidden] = useState(true);

  const handleNavButtonOnClick = () => {
    setIsNavHidden(!isNavHidden);
  }


  //action reducer
  const reducer = (state, action) => {
    switch (action.type) {
      case 'clickNav':
        return setIsNavHidden(action.isNavHidden);
      default:
        return state;
    }
  }

  return (
    <div>
      <div className="md:hidden w-screen p-3 fixed flex justify-end  ">
        <button className="flex items-center px-3 py-2 border rounded text-blue-400 border-blue-600 hover:text-blue-600 hover:border-blue-600 z-50" onClick={() => { handleNavButtonOnClick() }}>
          <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
        </button>
      </div>
      <div className="flex h-screen w-screen">
        {/* small screen nav */}
        <div className="md:hidden shadow-lg sticky" id="nav-container" style={{ minWidth: '12rem', transition: 'margin .5s', margin: isNavHidden ? '0 0 0 -12rem' : '0 0 0 0' }} >
          <StateProvider initialState={isNavHidden} reducer={reducer}>
            <NavBar onClick={handleNavButtonOnClick} />
          </StateProvider>
        </div>
        {/* large screen nav */}
        <div className="hidden md:block md:static md:h-screen md:w-2/12 shadow-lg overflow-hidden" id="nav-container" style={{ minWidth: '12rem' }} >
          <StateProvider initialState={"others"} reducer={reducer}>
            <NavBar />
          </StateProvider>
        </div>
        <div className="w-screen p-3 max-w-screen h-full md:p-0 md:w-10/12 overflow-y-auto overflow-x-auto" style={{ backgroundColor: 'F5F6F7', minWidth: '20rem' }} >
          <div className="md:p-4">
            <Pages />
          </div>
        </div>
      </div>
    </div>
  )
}

const Pages = () => (
  <Switch>
    <PrivateRoute exact path="/" component={() => <Redirect to={ADMIN_DASHBOARD_URL} />} />
    <PrivateRoute exact path={ADMIN_DASHBOARD_URL} component={DashboardPage} />
    {/* <PrivateRoute exact path={ADMIN_DASHBOARD_URL}>
      {({ match }) => (
        <CSSTransition
          in={match != null}
          timeout={300}
          classNames="page"
          unmountOnExit
        >
          <div className="page">
            <DashboardPage />
           </div>
        </CSSTransition>
      )}
    </PrivateRoute> */}
    <PrivateRoute exact path={ADMIN_USERMANAGEMENT_URL} component={UserManagementPage} />
    <PrivateRoute exact path={ADMIN_EVENTMANAGEMENT_URL} component={EventManagementPage} />
    <PrivateRoute exact path={ADMIN_MENTORING_URL} component={MentoringPage} />
    <PrivateRoute exact path={ADMIN_SENIORBUDDY_URL} component={SeniorBuddyPage} />
    <PrivateRoute exact path={ADMIN_INFORMATION_URL} component={InformationPage} />
    <PrivateRoute exact path={ADMIN_PROFILE_URL} component={ProfilePage} />
    <PrivateRoute exact path={CALENDAR_OF_EVENTS} component={CalendarOfEventsPage} />
    <PrivateRoute exact path={EDITOR_URL + ":subject/"} component={EditorPage} />
    <PrivateRoute exact path={EVENT_EDITOR_URL + ":subject/"} component={EventEditorPage} />
    <Route exact path={CLUB_INFO_URL + ":club/"} component={ClubInformationPage} />
    <PrivateRoute path component={() => <Redirect to={ADMIN_DASHBOARD_URL} />} />
  </Switch>
)

