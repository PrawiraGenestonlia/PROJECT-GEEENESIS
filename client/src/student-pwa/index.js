import React from 'react';
import { Route, Switch, Redirect } from "react-router-dom";

export default () => {
  return (
    <div className="h-screen w-screen">
      <p>nav</p>
      <Pages />
    </div>
  )
}

const Pages = () => (
  <Switch>
    <Route exact path="/student/home" component={() => <div>STUDENT PAGE</div>} />
  </Switch>
)
