import React from 'react';
import { Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

import Authentication from '../components/Authentication';

const styles = {
  avatar: {
    width: '100px',
    height: '100px',
    fontSize: '50px',
    alignSelf: 'center',
  },
  avatarWrap: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centering: {
    textAlign: 'center',
  },
  righting: {
    display: 'block',
    margin: '5px auto',
  }
}

class MyInfo extends React.Component {

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
    const classes = this.props.classes;
    return (
      <React.Fragment>
        {!this.state.redirect|| <Redirect to='/signin' />}
        <div key='usericon' className={classes.avatarWrap}><Avatar className={classes.avatar}>{this.state.me.username.charAt(0)}</Avatar></div>
        <h1 key='username' className={classes.centering}>{this.state.me.username}</h1>
        <div key='createAt' className={classes.centering}>{(new Date(this.state.me.createAt)).toString()}</div>
        <Button variant='contained' color='primary' onClick={this.signOut}  className={classes.righting}>SIGNOUT</Button>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(MyInfo);