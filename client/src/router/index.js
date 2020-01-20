import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { SERVER_BASE_URL, LOGIN_URL, REDIRECT_URL, ADMIN_EXTENDED_URL, STUDENT_EXTENDED_URL } from '../constants';
import { CLUB_STANDALONE_URL, CLUB_ALL_STANDALONE_URL, EVENT_STANDALONE_URL } from '../constants';
import { ClubStandalonePage, EventStandalonePage, AllClubStandalonePage } from '../admin-app/pages';
import PrivateRoute from './privateRoute';
import PublicRoute from './publicRoute';
import LoginPage from '../public-page/login';
import RedirectPage from '../public-page/redirectPage';
import AdminApp from '../admin-app';
import StudentApp from '../student-pwa';
import ForceReloadBar from '../components/forceReloadBar';

export default () => {
  return (
    <BrowserRouter basename={SERVER_BASE_URL}>
      <ForceReloadBar />
      <Switch>
        {/* REDIRECTING FOR AUTH */}
        <Route exact path="/" component={() => <Redirect to={LOGIN_URL} />} />
        <PublicRoute exact path={LOGIN_URL} component={LoginPage} />
        <PrivateRoute exact path={REDIRECT_URL} component={RedirectPage} />
        {/* SERVING STANDALONE PAGE */}
        <Route exact path={CLUB_STANDALONE_URL + ":club/"} component={ClubStandalonePage} />
        <Route exact path={EVENT_STANDALONE_URL + ":event/"} component={EventStandalonePage} />
        <Route exact path={CLUB_ALL_STANDALONE_URL} component={AllClubStandalonePage} />
        {/* ADMIN */}
        <Route path={ADMIN_EXTENDED_URL} component={AdminApp} />
        {/* STUDENT */}
        <Route path={STUDENT_EXTENDED_URL} component={StudentApp} />
        <Route path='' component={() => <Redirect to={LOGIN_URL} />} />
      </Switch>
    </BrowserRouter>
  )
}
