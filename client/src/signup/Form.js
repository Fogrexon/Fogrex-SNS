import React from 'react';
import {makeStyles} from '@material-ui/core/styles'; 
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  inputForm: {
    width: '100%',
    margin: '0px 0px 10px 0px',
  },
  paper: {
    margin: '0px 0px 10px 0px',
    padding: '15px',
  },
  primaryTheme: {
    borderColor: '#1976d2',
    borderWidth: 2,
    borderStyle: 'solid',
    color: '#1976d2',
  },
  secondaryTheme: {
    borderColor: '#dc004e',
    borderWidth: 2,
    borderStyle: 'solid',
    color: '#dc004e',
  },
  button: {
    display: 'block',
    margin: '0 0 0 auto',
  },
});



export default (props) => {
  const classes = useStyles();
  return (
    <form>
      <Paper variant='elevation' className={[classes.paper, classes.primaryTheme].join(" ") }>{props.message || 'Input username and password'}</Paper>
      <TextField key='username' label='Username' variant='outlined' className={ classes.inputForm } />
      <TextField key='password' label='Password' type='password' variant='outlined' className={ classes.inputForm } />
      <Button variant='contained' color='primary' className={classes.button}>SIGNUP</Button>
    </form>
  );
}