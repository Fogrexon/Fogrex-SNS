import React from 'react';
import { Redirect } from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles'; 
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import axios from 'axios';

const useStyles = makeStyles({
  inputForm: {
    width: '100%',
    margin: '10px auto 0 auto',
  },
  paper: {
    margin: '10px auto 0 auto',
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
    margin: '10px 0 0 auto',
  },
});


export default (props) => {
  const [values, setValues] = React.useState({
    text: '',
    errorMessage: null,
    okMessage: null,
    redirect: false,
  });

  const handleChange = (e) => {
    setValues({ ...values, text: e.target.value });
  }

  const handleSubmit = () => {
    axios
      .post('/api/post', {text: values.text})
      .then((res) => {
        setValues({...values, okMessage: res.data.message, errorMessage: null });
        setInterval(() => setValues({...values, redirect: true}), 2000);
      })
      .catch((error) => {
        if(error.response.status === 401) setValues({...values, errorMessage: error.response.data.message, okMessage: null });
      });
  }

  const classes = useStyles();
  return (
    <form>
      { !values.redirect || <Redirect to='/' /> }
      { values.errorMessage ? <Paper variant='elevation' className={ [classes.paper, classes.secondaryTheme].join(" ") }>{ values.errorMessage }</Paper> : null }
      { values.okMessage ? <Paper variant='elevation' className={ [classes.paper, classes.primaryTheme].join(" ") }>{ values.okMessage }</Paper> : null }
      <TextField
        className={ classes.inputForm }
        label='Content'
        multiline
        rows='8'
        variant='outlined'
        onChange={handleChange}
      />
      <Button variant='contained' color='primary' className={classes.button} onClick={handleSubmit}>POST</Button>
    </form>
  );
}