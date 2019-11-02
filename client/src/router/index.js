import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { SERVER_BASE_URL, } from '../constants';
import { CLUB_STANDALONE_URL } from '../constants';
import { ClubStandalonePage } from '../admin-app/pages';
import AdminApp from '../admin-app';

export default () => {
  return (
    <BrowserRouter basename={SERVER_BASE_URL}>
      <Switch>
        <Route exact path={CLUB_STANDALONE_URL + ":club/"} component={ClubStandalonePage} />
        <Route path={''} component={AdminApp} />
        <Route path={"/student"} render={() => { return <div>student</div> }} />
        <Route path={"/"} render={() => { return <div>not found</div> }} />
      </Switch>
    </BrowserRouter>
  )
}