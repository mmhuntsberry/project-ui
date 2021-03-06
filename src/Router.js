import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./views/Login";
import Signup from "./views/Signup";
import User from "./views/User";

const Router = () => (
  <Switch>
    <Route exact path="/" component={Signup} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/user/:id" component={User} />
  </Switch>
);

export default Router;
