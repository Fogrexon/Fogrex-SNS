import React from 'react';
import {withRouter} from 'react-router-dom';
import SignedInNavs from './SignedIn';
import SignInNavs from './SignIn';

import Authentication from '../Authentication';


const NavProto = (props) => {
  let location = props.location.pathname.split('/')[1];
  location = location === '' ? 'home' : location;

  return (
    <Authentication.Consumer>
      {
        value => {
          if(!value || !value.username) return <SignInNavs location={ location } {...props}/>
          return <SignedInNavs location={ location } {...props} />
        }
      }
    </Authentication.Consumer>
  );
}

const Navigationbar = withRouter(props => <NavProto {...props}/>);

export default Navigationbar;