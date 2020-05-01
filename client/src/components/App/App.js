import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "../Home";
import Create from "../Create";
import GlobalStyles from "../GlobalStyles";
import ScrollToTop from "../../ScrollToTop";
import Trail from "../Trail";

function App() {
  return (
    <Router>
      <GlobalStyles />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/create" exact>
          <Create />
        </Route>
        <Route path="/trail/:trailId" exact>
          <Trail />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
