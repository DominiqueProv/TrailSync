import React, { useContext, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "../Home";
import Create from "../Create";
import GlobalStyles from "../GlobalStyles";
// import ScrollToTop from "../../ScrollToTop";
import Trail from "../Trail";
import { CurrentAppContext } from "../contexts/Trails.context";
import NavBar from "../NavBar";
import Init from "../Init";
import Maps from "../Maps";

function App() {
  const { currentAppState } = useContext(CurrentAppContext);
  let isLoggedIn;
  let storage;

  if (currentAppState.storage || localStorage.getItem("isLoggedIn")) {
    isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));
    storage = JSON.parse(localStorage.getItem("storage"));
  }
  return (
    <Router>
      <GlobalStyles />
      {isLoggedIn && <NavBar />}
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/init" exact>
          <Init />
        </Route>
        <Route path="/trail/:trailId" exact>
          {storage && <Trail />}
        </Route>
        <Route path="/map" exact>
          {storage && <Maps />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
