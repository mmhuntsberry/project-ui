import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Account from "./views/Account";

const Router = () => (
  <Switch>
    <Route exact path="/" component={Signup} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/account" component={Account} />
  </Switch>
);

export default Router;
