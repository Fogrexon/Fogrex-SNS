import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import axios from 'axios';
import './App.css';

import Authentication from './components/Authentication';
import Navigationbar from './navigationbar/Main';

// import Timeline from './timeline/Main';
import SignIn from './signin/Main';
import SignUp from './signup/Main';

export default class App extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {
      username: null,
    }
  }

  componentDidMount() {
    this.whoAmI();
  }

  whoAmI() {
    console.log("whoami");
    axios.get('/api/whoami').then(
      (res) => this.setState({ username: res.data.username })
    ).catch(
      (err) => this.setState({ username: null })
    );
  }

  render() {
    return (
      <Authentication.Provider value={ this.state.username }>
        <Router>
          <Navigationbar />
          <Switch>
            <Route exact path='/signup'><SignUp /></Route>
            <Route exact path='/signin'><SignIn /></Route>
          </Switch>
        </Router>
      </Authentication.Provider>
    )
  }
}

