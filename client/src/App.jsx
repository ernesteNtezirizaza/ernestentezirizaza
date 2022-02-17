import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Nav from "./components/Navbar";

import Home from "./components/Home";
import Buy from "./components/buy-electricity";
import Balance from "./components/check-balance";

const App = () => {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/buy-electricity">
          <Buy />
        </Route>{" "}
        <Route path="/check-balance">
          <Balance />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
