import React from "react";
import { Switch, Route } from "react-router-dom";
import Signup from "./views/Signup";

const Router = () => (
  <Switch>
    <Route exact path="/" component={Signup} />
  </Switch>
);

export default Router;
