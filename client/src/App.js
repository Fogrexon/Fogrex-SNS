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
import Post from './post/Main';
import Reply from './reply/Main';

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/signup'><SignUp /></Route>
          <Route exact path='/signin'><SignIn /></Route>
          <Route exact path='/'><Timeline /></Route>
          <Route exact path='/post'><Post /></Route>
          <Route exact path='/reply/:postid' component={ Reply } />
        </Switch>
      </Router>
    );
  }
}

