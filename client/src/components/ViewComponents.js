import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container';

const useStyles = makeStyles({
  header: {
    textAlign: 'center',
  },
  contents: {
    padding: '10px 20px',
    margin: '56px 0px',
  },
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


export const Header = (props) => {
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

export const Contents = (props) => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth='sm' {...props} className={useStyles().contents} />
    </React.Fragment>
  );
}
