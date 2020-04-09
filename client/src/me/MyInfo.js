import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

import Authentication from '../components/Authentication';

export default class MyInfo extends React.Component {

  static contextType = Authentication;

  constructor(props)
  {
    super(props);
    this.prevContext = this.context;
    this.state = {
      me: null,
      redirect: false,
    };

    this.signOut = this.signOut.bind(this);
  }
  componentDidUpdate() {
    if(this.prevContext !== this.context) {
      this.tick();
      this.prevContext = this.context;
    }
  }

  tick() {
    if(!this.context) return;
    axios
      .get(`/api/me`)
      .then((res) => {
        if(res.status !== 200) return;
        this.setState({
          me: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  signOut() {
    axios
    .post(`/api/signout`)
    .then((res) => {
      if(res.status !== 200) return;
      this.setState({
        redirect: true,
      });
    })
    .catch((err) => {
      console.log(err);
    });
  }

  

  render(){
    if(!this.state.me) {
      return (
        <React.Fragment>
          {'Loading...'}
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        {!this.state.redirect|| <Redirect to='/signin' />}
        <Avatar>{this.state.me.username.charAt(0)}</Avatar>
        <div key='username'>{this.state.me.username}</div>
        <div key='createAt'>{(new Date(this.state.me.createAt)).toString()}</div>
        <Button variant='contained' color='primary' onClick={this.signOut}>SIGNOUT</Button>
      </React.Fragment>
    );
  }
}
