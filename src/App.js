import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Home from './screens/Home';
import AnimeDetail from './screens/AnimeDetail';
import './index.css';

class App extends Component {
  render() {
    return  (
      <div>
        <div className="titlebar"></div>
        <Router>
          <Switch>
            <Route path="/anime/:id">
              <AnimeDetail />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="**">
              <Redirect to="/" />
            </Route>
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App;
