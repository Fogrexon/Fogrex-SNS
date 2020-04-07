import React from 'react';
import { Link } from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import SvgIcon from '@material-ui/core/SvgIcon';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';


const useStyles = makeStyles({
  root: {
    position: 'fixed',
    bottom: '0px',
    width:'100%',
  },
  postButton: {
    position: 'fixed',
    bottom: '81px',
    right: '25px',
  }
});


const HomeIcon = (props) => {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
} 

const SignedInNavs = (props) => {
  const classes = useStyles();
  return (
    <div>
      <BottomNavigation showLabels value={props.basePath} className={ [classes.root, props.className].join(' ') } >
        <BottomNavigationAction component={Link} to='/' label='Home' value='home' icon={<HomeIcon />} />
        <BottomNavigationAction component={Link} to='/me' label='Me' value='me' icon={<AccountCircleIcon />} />
        <BottomNavigationAction component={Link} to='/favs' label='Favorites' value='favs' icon={<FavoriteIcon />} />
      </BottomNavigation>
      <Fab color="primary" aria-label="edit" className={classes.postButton} component={Link} to='/post' >
        <EditIcon />
      </Fab>
    </div>
  );
}

export default SignedInNavs;