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
import Detail from './detail/Main';

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/signup' component={ SignUp } />
          <Route exact path='/signin' component={ SignIn } />
          <Route exact path='/' component={ Timeline } />
          <Route exact path='/post' component={ Post } />
          <Route exact path='/reply/:postid' component={ Reply } />
          <Route exact path='/detail/:postid' component={ Detail } />
        </Switch>
      </Router>
    );
  }
}

