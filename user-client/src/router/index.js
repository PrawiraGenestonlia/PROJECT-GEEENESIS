import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import PrivateRoute from './privateRoute';
import PublicRoute from './publicRoute';
import ForceReloadBar from '../components/forceReloadBar';
import { SERVER_BASE_URL, LOGIN_URL, APP_URL, HOME_URL } from './constants.router';
import LoginScreen from '../pages/loginScreen';
import HomeScreen from '../pages/homeScreen';


const MainApp = () => {
  return (
    <Switch>
      <PrivateRoute exact path={HOME_URL} component={HomeScreen} />
    </Switch>
  )
}

export default () => {
  return (
    <BrowserRouter basename={SERVER_BASE_URL}>
      <ForceReloadBar />
      <Switch>
        {/* REDIRECTING FOR AUTH */}
        <Route exact path="/" component={() => <Redirect to={LOGIN_URL} />} />
        <PublicRoute exact path={LOGIN_URL} component={LoginScreen} />
        {/* MAIN APP */}
        <Route path={APP_URL} component={MainApp} />
      </Switch>
    </BrowserRouter>
  )
}
