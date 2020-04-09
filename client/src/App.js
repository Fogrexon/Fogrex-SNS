import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import './App.css';
import axios from 'axios';

import Authentication from './components/Authentication';
import Navigationbar from './components/navigationbar/Main';

import Timeline from './timeline/Main';
import SignIn from './signin/Main';
import SignUp from './signup/Main';
import Post from './post/Main';
import Reply from './reply/Main';
import Detail from './detail/Main';
import Me from './me/Main';
import Favs from './favorites/Main';

export default () => {
  const [auth, setAuth] = React.useState(null);
  let prevPath = null;
  const checkAuth = (path) => () => {
    if(prevPath === path) return;
    axios.get('/api/whoami').then(
      (res) => {
        if(auth !== res.data.username) setAuth({ username: res.data.username });
      }
    ).catch(
      () => setAuth({ username: null })
    );
    prevPath = path;
  }

  return (
    <Router>
      <Authentication.Provider value={auth}>
        <Navigationbar />
        <Switch>
          <Route exact path='/signup' render={(props)=> <SignUp auth={checkAuth('signup')} {...props} />} />
          <Route exact path='/signin' render={(props)=> <SignIn auth={checkAuth('signin')} {...props} />} />
          <Route exact path='/' render={(props)=> <Timeline auth={checkAuth('home')} {...props} />} />
          <Route exact path='/post' render={(props)=> <Post auth={checkAuth('post')} {...props} />} />
          <Route exact path='/reply/:postid' render={(props)=> <Reply auth={checkAuth('reply')} {...props} />} />
          <Route exact path='/detail/:postid' render={(props)=> <Detail auth={checkAuth('detail')} {...props} />} />
          <Route exact path='/me' render={(props)=> <Me auth={checkAuth('me')} {...props} />} />
          <Route exact path='/favs' render={(props)=> <Favs auth={checkAuth('favs')} {...props} />} />
        </Switch>
      </Authentication.Provider>
  </Router>
  );
}
