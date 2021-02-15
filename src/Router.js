import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./views/Login";
import Signup from "./views/Signup";

const Router = () => (
  <Switch>
    <Route exact path="/" component={Signup} />
    <Route exact path="/login" component={Login} />
  </Switch>
);

export default Router;
