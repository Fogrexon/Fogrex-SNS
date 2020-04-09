import React from 'react';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import SignedInNavs from './SignedIn';
import SignInNavs from './SignIn';

import Authentication from '../Authentication';

const useStyles = makeStyles({
  indexChanger: {
    zIndex: 10000,
  },
});



const Elevation = (props) => {
  const { children } = props;

  return React.cloneElement(children, {
    elevation: 4,
  });
}


const NavProto = (props) => {
  const classes = useStyles();
  let location = props.location.pathname.split('/')[1];
  location = location === '' ? 'home' : location;

  return (
    <Elevation>
      <Authentication.Consumer>
        {
          value => {
            if(!value || !value.username) return <SignInNavs basePath={ location } className={classes.indexChanger} {...props}/>
            return <SignedInNavs basePath={ location } className={classes.indexChanger} {...props} />
          }
        }
      </Authentication.Consumer>
    </Elevation>
  );
}

const Navigationbar = withRouter(props => <NavProto {...props}/>);

export default Navigationbar;