import React from 'react';
import { Switch, Redirect } from "react-router-dom";
import { STUDENT_HOME_URL } from '../constants';
import PrivateRoute from '../router/privateRoute';
import ChangePassword from '../components/changePassword';

//
function handleLogOut() {
  localStorage.removeItem('auth-token');
  window.location.reload();
}

export default () => {
  return (
    <div className="h-screen w-screen">
      <p>nav</p>
      <ChangePassword />
      <button className="btn bg-blue-200 p-2 rounded-full" onClick={() => { handleLogOut() }}>Log Out</button>
      <Pages />
    </div>
  )
}

const Pages = () => (
  <Switch>
    <PrivateRoute exact path="/" component={() => <Redirect to={STUDENT_HOME_URL} />} />
    <PrivateRoute exact path={STUDENT_HOME_URL} component={() => <div>STUDENT PAGE</div>} />
    <PrivateRoute exact component={() => <Redirect to={STUDENT_HOME_URL} />} />
  </Switch>
)
