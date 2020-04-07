import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import './App.css';

import Timeline from './timeline/Main';
import SignIn from './signin/Main';
import SignUp from './signup/Main';

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/signup'><SignUp /></Route>
          <Route exact path='/signin'><SignIn /></Route>
          <Route exact path='/'><Timeline /></Route>
        </Switch>
      </Router>
    );
  }
}

