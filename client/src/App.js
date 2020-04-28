import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Home from './Home';
import Create from './Create';

function App() {

  console.log('Hello');

  return (
    <Router>
      <Switch>
        <Route path='/' exact>
          <Home/>
        </Route>
        <Route path='/create' exact>
          <Create/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
