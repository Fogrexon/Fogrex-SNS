import React from 'react';
import { Link } from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import CreateIcon from '@material-ui/icons/Create';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';


const useStyles = makeStyles({
  root: {
    position: 'fixed',
    bottom: '0px',
    width:'100%',
  },
});


const SignInNavs = (props) => {
  const classes = useStyles();
  return (
    <BottomNavigation showLabels value={props.location} className={classes.root}>
      <BottomNavigationAction component={Link} to='/signup' label='Signup' value='signup' icon={<CreateIcon />} />
      <BottomNavigationAction component={Link} to='/signin' label='Signin' value='signin' icon={<ExitToAppIcon />} />
    </BottomNavigation>
  );
}

export default SignInNavs;