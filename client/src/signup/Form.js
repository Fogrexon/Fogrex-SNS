import React from 'react';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles'; 
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import Authentication from '../components/Authentication';

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
    username: '',
    password: '',
    showPassword: false,
    redirect: false,
    errorMessage: null,
    okMessage: null,
  });

  const handleChange = (prop) => (e) => {
    setValues({ ...values, [prop]: e.target.value });
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('/api/signup', {username: values.username, password: values.password})
      .then((res) => {
        setValues({ ...values, errorMessage: null, okMessage: res.data.message });
        setTimeout(() => setValues({...values, redirect: true}), 1000);
      })
      .catch((error) => {
        if(!!error.response) setValues({...values, errorMessage: error.response.data.message, okMessage: null });
      });
  }

  const classes = useStyles();
  return (
    <form onSubmit={handleSubmit}>
      <Authentication.Consumer>
        {
          auth => {
            return !(values.redirect || (!!auth && auth.username)) || <Redirect to='/signin' />
          }
        }
      </Authentication.Consumer>
      { values.errorMessage ? <Paper variant='elevation' className={ [classes.paper, classes.secondaryTheme].join(" ") }>{ values.errorMessage }</Paper> : null }
      { values.okMessage ? <Paper variant='elevation' className={ [classes.paper, classes.primaryTheme].join(" ") }>{ values.okMessage }</Paper> : null }
      <TextField 
        key='username' 
        label='Username' 
        variant='outlined' 
        className={ classes.inputForm } 
        onChange={ handleChange('username') } 
      />
      <FormControl className={classes.inputForm} variant='outlined'>
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge='end'
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={70}
          />
        </FormControl>
      <Button type='submit' variant='contained' color='primary' className={classes.button}>SIGNUP</Button>
    </form>
  );
}