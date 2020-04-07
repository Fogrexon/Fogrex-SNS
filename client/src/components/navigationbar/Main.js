import React from 'react';
import {withRouter} from 'react-router-dom';
import SignedInNavs from './SignedIn';
import SignInNavs from './SignIn';

import Authentication from '../Authentication';


const NavProto = (props) => {
  let location = props.location.pathname.split('/')[1];
  location = location === '' ? 'home' : location;
  console.log(location);

  return (
    <Authentication.Consumer>
      {
        value => {
          if(!value || !value.username) return <SignInNavs basePath={ location } {...props}/>
          return <SignedInNavs basePath={ location } {...props} />
        }
      }
    </Authentication.Consumer>
  );
}

const Navigationbar = withRouter(props => <NavProto {...props}/>);

export default Navigationbar;