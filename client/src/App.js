import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import axios from 'axios';
import './App.css';

import Timeline from './timeline/Main.js';

export default class App extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {
      username: null,
    }
  }

  componentWillMount() {
    this.whoAmI();
  }

  componentWillUpdate() {
    this.whoAmI();
  }

  whoAmI() {
    axios.get('/api/whoami').then(
      (res) => this.setState({ username: res.username })
    ).catch(
      (err) => this.setState({ username: null })
    );
  }

  routers() {
    if(!this.state.username){
      return (
        <ul><li><Link to='/signin'>SignIn</Link></li></ul>        
      );
    }
    return (
      <ul>
        <li><Link to='/'>Home</Link></li>
      </ul>
    ); 
  }

  switchers() {
    return (
      <Switch>
        <Route exact path='/'><Timeline username={this.state.username} /></Route>
      </Switch>
    )
  }

  render() {
    return (
      <Router>
        { this.routers() }
        { this.switchers() }
      </Router>
    )
  }
}

