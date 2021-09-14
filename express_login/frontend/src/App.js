import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
// Views
import Admin from "./views/Admin";
import Login from "./views/Login";
import Signup from "./views/Signup";
// CSS
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/Admin" component={Admin} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
