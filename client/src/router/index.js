import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { SERVER_BASE_URL, LOGIN_URL } from '../constants';
import { CLUB_STANDALONE_URL } from '../constants';
import { ClubStandalonePage } from '../admin-app/pages';
import PrivateRoute from './privateRoute';
import PublicRoute from './publicRoute';
import LoginPage from '../public-page/login';
import AdminApp from '../admin-app';
import StudentApp from '../student-pwa'

export default () => {
  return (
    <BrowserRouter basename={SERVER_BASE_URL}>
      <Switch>
        {/* <PublicPages /> */}
        <Route exact path={"/"} component={() => <Redirect to={LOGIN_URL} />} />
        <PublicRoute exact path={LOGIN_URL} component={LoginPage} />
        <Route exact path={CLUB_STANDALONE_URL + ":club/"} component={ClubStandalonePage} />
        <Route path={"/admin"} component={AdminApp} />
        <Route path={"/student"} component={StudentApp} />
        <Route path={"/"} render={() => { return <div>not found</div> }} />
      </Switch>
    </BrowserRouter>
  )
}

const PublicPages = () => (
  <React.Fragment>
    <Route exact path={CLUB_STANDALONE_URL + ":club/"} component={ClubStandalonePage} />
  </React.Fragment>
)