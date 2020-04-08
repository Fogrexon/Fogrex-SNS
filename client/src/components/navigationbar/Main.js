import React from 'react';
import {withRouter} from 'react-router-dom';
import SignedInNavs from './SignedIn';
import SignInNavs from './SignIn';

import Authentication from '../Authentication';


const Elevation = (props) => {
  const { children } = props;
  // const trigger = useScrollTrigger({
  //   disableHysteresis: true,
  //   threshold: 0,
  // });

  return React.cloneElement(children, {
    // elevation: trigger ? 4 : 0,
    elevation: 4,
  });
}


const NavProto = (props) => {
  let location = props.location.pathname.split('/')[1];
  location = location === '' ? 'home' : location;

  return (
    <Elevation>
      <Authentication.Consumer>
        {
          value => {
            if(!value || !value.username) return <SignInNavs basePath={ location } {...props}/>
            return <SignedInNavs basePath={ location } {...props} />
          }
        }
      </Authentication.Consumer>
    </Elevation>
  );
}

const Navigationbar = withRouter(props => <NavProto {...props}/>);

export default Navigationbar;