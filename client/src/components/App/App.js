import React, { useContext, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "../Home";
import Create from "../Create";
import GlobalStyles from "../GlobalStyles";
import Trail from "../Trail";
import { CurrentAppContext } from "../contexts/Trails.context";
import NavBar from "../NavBar";
import Init from "../Init";
import Maps from "../Maps";
import Profile from "../Profile";
import PopUpModalIntro from "../PopUpModalIntro";
import ScrollToTop from "../../ScrollToTop";
function App() {
  const { currentAppState } = useContext(CurrentAppContext);
  let isLoggedIn;
  let storage;
  let isFirstVisit;
  const [open, setOpen] = useState(true);
  if (currentAppState.storage || localStorage.getItem("isLoggedIn")) {
    isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));
    storage = JSON.parse(localStorage.getItem("storage"));
    isFirstVisit = JSON.parse(localStorage.getItem("firstVisit"));
  }
  const toggle = () => {
    setOpen(false);
    window.localStorage.setItem("firstVisit", JSON.stringify(false));
  };

  return (
    <Router>
      <GlobalStyles />
      <ScrollToTop />
      {isLoggedIn === true && <NavBar />}
      {isFirstVisit && <PopUpModalIntro open={open} toggle={toggle} />}
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/init" exact>
          <Init />
        </Route>
        <Route path="/profile" exact>
          {storage && <Profile />}
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
