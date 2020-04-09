import React from 'react';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Container from '@material-ui/core/Container';

import Authentication from './Authentication';

const useStyles = makeStyles({
  header: {
    textAlign: 'center',
  },
  contents: {
    padding: '10px 20px',
    margin: '56px auto',
  },
  indexChanger: {
    zIndex: 10000,
  }
});


const ElevationScroll = (props) => {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}


const Header = (props) => {
  return (
    <ElevationScroll>
      <AppBar>
        <Toolbar>
          <Typography variant='h6' className={useStyles().header}>{ props.title }</Typography>
        </Toolbar>
      </AppBar>
    </ElevationScroll>
  );
}

const Contents = (props) => {
  return (
      <Container maxWidth='sm' {...props} className={useStyles().contents}>
        { props.children }
      </Container>
  );
}

export const ViewFrame = (props) => {
  const classes = useStyles();
  return (
    <React.Fragment>
        <Header title={props.title} className={classes.indexChanger} />
        <Contents>
          { props.children }
        </Contents>
    </React.Fragment>
  );
}

export const Redirector = () => {
  return (
    <Authentication.Consumer>
      { value => {
        if(!!value && !value.username) return <Redirect to='/signin' />
      }}
    </Authentication.Consumer>
  )
}
