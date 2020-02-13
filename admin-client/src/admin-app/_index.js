import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { SERVER_BASE_URL, } from '../constants';
import NavBar from './components/navBar';
import Pages from '../router';
import { CLUB_STANDALONE_URL } from '../constants';
import { ClubStandalonePage } from './pages';

const otherRoute = () => (
  <React.Fragment>
    <div className="static h-screen w-2/12 shadow-lg overflow-hidden" id="nav-container" style={{ minWidth: '12rem' }} >
      <NavBar />
    </div>
    <div className="h-full w-10/12 overflow-y-auto overflow-x-auto" style={{ backgroundColor: 'F5F6F7', minWidth: '30rem' }} >
      <div className="p-4"><Pages /></div>
    </div>
  </React.Fragment>
)

export default () => {
  return (
    <BrowserRouter basename={SERVER_BASE_URL}>
      <Switch>
        <Route exact path={CLUB_STANDALONE_URL + ":club/"} component={ClubStandalonePage} />
        <div className="flex h-screen w-screen">
          <Route path={"/admin"} component={otherRoute} />
        </div>
        <Route path={"/student"} render={() => { return <div>student</div> }} />
      </Switch>
    </BrowserRouter>
  )
}